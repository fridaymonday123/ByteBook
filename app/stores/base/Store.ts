import invariant from "invariant";
import lowerFirst from "lodash/lowerFirst";
import orderBy from "lodash/orderBy";
import { observable, action, computed, runInAction } from "mobx";
import pluralize from "pluralize";
import RootStore from "~/stores/RootStore";
import Policy from "~/models/Policy";
import Model from "~/models/base/Model";
import { getInverseRelationsForModelClass } from "~/models/decorators/Relation";
import { PaginationParams, PartialWithId } from "~/types";
import { client } from "~/utils/ApiClient";
import { AuthorizationError, NotFoundError } from "~/utils/errors";

export enum RPCAction {
  Info = "info",
  List = "list",
  Create = "create",
  Update = "update",
  Delete = "delete",
  Count = "count",
}

type FetchPageParams = PaginationParams & Record<string, any>;

export const PAGINATION_SYMBOL = Symbol.for("pagination");

export default abstract class Store<T extends Model> {
  @observable
  data: Map<string, T> = new Map();

  @observable
  isFetching = false;

  @observable
  isSaving = false;

  @observable
  isLoaded = false;

  model: typeof Model;

  modelName: string;

  apiEndpoint: string;

  rootStore: RootStore;

  actions = [
    RPCAction.Info,
    RPCAction.List,
    RPCAction.Create,
    RPCAction.Update,
    RPCAction.Delete,
    RPCAction.Count,
  ];

  constructor(rootStore: RootStore, model: typeof Model) {
    this.rootStore = rootStore;
    this.model = model;
    this.modelName = model.modelName;

    if (!this.apiEndpoint) {
      this.apiEndpoint = pluralize(lowerFirst(model.modelName));
    }
  }

  @action
  clear() {
    this.data.clear();
  }

  addPolicies = (policies: Policy[]) => {
    if (policies) {
      policies.forEach((policy) => this.rootStore.policies.add(policy));
    }
  };

  @action
  add = (item: PartialWithId<T> | T): T => {
    const ModelClass = this.model;

    if (!(item instanceof ModelClass)) {
      const existingModel = this.data.get(item.id);

      if (existingModel) {
        existingModel.updateData(item);
        return existingModel;
      }

      // @ts-expect-error TS thinks that we're instantiating an abstract class here
      const newModel = new ModelClass(item, this);
      this.data.set(newModel.id, newModel);
      return newModel;
    }

    this.data.set(item.id, item);
    return item;
  };

  @action
  remove(id: string): void {
    const inverseRelations = getInverseRelationsForModelClass(this.model);

    inverseRelations.forEach((relation) => {
      const store = this.rootStore.getStoreForModelName(relation.modelName);
      if ("orderedData" in store) {
        const items = (store.orderedData as Model[]).filter(
          (item) => item[relation.idKey] === id
        );

        if (relation.options.onDelete === "cascade") {
          items.forEach((item) => store.remove(item.id));
        }

        if (relation.options.onDelete === "null") {
          items.forEach((item) => {
            item[relation.idKey] = null;
          });
        }
      }
    });

    this.data.delete(id);
  }

  save(
    params: Partial<T>,
    options: Record<string, string | boolean | number | undefined> = {}
  ): Promise<T> {
    const { isNew, ...rest } = options;
    if (isNew || !params.id) {
      return this.create(params, rest);
    }
    return this.update(params, rest);
  }

  get(id: string): T | undefined {
    return this.data.get(id);
  }

  @action
  async create(
    params: Partial<T>,
    options?: Record<string, string | boolean | number | undefined>
  ): Promise<T> {
    if (!this.actions.includes(RPCAction.Create)) {
      throw new Error(`Cannot create ${this.modelName}`);
    }

    this.isSaving = true;

    try {
      const res = await client.post(`/${this.apiEndpoint}.create`, {
        ...params,
        ...options,
      });

      invariant(res?.data, "Data should be available");
      this.addPolicies(res.policies);
      return this.add(res.data);
    } finally {
      this.isSaving = false;
    }
  }

  @action
  async update(
    params: Partial<T>,
    options?: Record<string, string | boolean | number | undefined>
  ): Promise<T> {
    if (!this.actions.includes(RPCAction.Update)) {
      throw new Error(`Cannot update ${this.modelName}`);
    }

    this.isSaving = true;

    try {
      const res = await client.post(`/${this.apiEndpoint}.update`, {
        ...params,
        ...options,
      });

      invariant(res?.data, "Data should be available");
      this.addPolicies(res.policies);
      return this.add(res.data);
    } finally {
      this.isSaving = false;
    }
  }

  @action
  async delete(item: T, options: Record<string, any> = {}) {
    if (!this.actions.includes(RPCAction.Delete)) {
      throw new Error(`Cannot delete ${this.modelName}`);
    }

    if (item.isNew) {
      return this.remove(item.id);
    }

    this.isSaving = true;

    try {
      await client.post(`/${this.apiEndpoint}.delete`, {
        id: item.id,
        ...options,
      });
      return this.remove(item.id);
    } finally {
      this.isSaving = false;
    }
  }

  @action
  async fetch(id: string, options: Record<string, any> = {}): Promise<T> {
    if (!this.actions.includes(RPCAction.Info)) {
      throw new Error(`Cannot fetch ${this.modelName}`);
    }

    const item = this.data.get(id);
    if (item && !options.force) {
      return item;
    }
    this.isFetching = true;

    try {
      const res = await client.post(`/${this.apiEndpoint}.info`, {
        id,
      });
      invariant(res?.data, "Data should be available");
      this.addPolicies(res.policies);
      return this.add(res.data);
    } catch (err) {
      if (err instanceof AuthorizationError || err instanceof NotFoundError) {
        this.remove(id);
      }

      throw err;
    } finally {
      this.isFetching = false;
    }
  }

  @action
  fetchPage = async (params: FetchPageParams | undefined): Promise<T[]> => {
    if (!this.actions.includes(RPCAction.List)) {
      throw new Error(`Cannot list ${this.modelName}`);
    }

    this.isFetching = true;

    try {
      const res = await client.post(`/${this.apiEndpoint}.list`, params);
      invariant(res?.data, "Data not available");

      let response: T[] = [];

      runInAction(`list#${this.modelName}`, () => {
        this.addPolicies(res.policies);
        response = res.data.map(this.add);
        this.isLoaded = true;
      });

      response[PAGINATION_SYMBOL] = res.pagination;
      return response;
    } finally {
      this.isFetching = false;
    }
  };

  @computed
  get orderedData(): T[] {
    return orderBy(Array.from(this.data.values()), "createdAt", "desc");
  }
}
