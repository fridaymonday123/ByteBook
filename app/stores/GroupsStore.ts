import invariant from "invariant";
import filter from "lodash/filter";
import { action, runInAction, computed } from "mobx";
import naturalSort from "@shared/utils/naturalSort";
import Group from "~/models/Group";
import { PaginationParams } from "~/types";
import { client } from "~/utils/ApiClient";
import RootStore from "./RootStore";
import Store from "./base/Store";

type FetchPageParams = PaginationParams & { query?: string };

export default class GroupsStore extends Store<Group> {
  constructor(rootStore: RootStore) {
    super(rootStore, Group);
  }

  @computed
  get orderedData(): Group[] {
    return naturalSort(Array.from(this.data.values()), "name");
  }

  @action
  fetchPage = async (params: FetchPageParams | undefined): Promise<Group[]> => {
    this.isFetching = true;

    try {
      const res = await client.post(`/groups.list`, params);
      invariant(res?.data, "Data not available");

      let models: Group[] = [];
      runInAction(`GroupsStore#fetchPage`, () => {
        this.addPolicies(res.policies);
        models = res.data.groups.map(this.add);
        res.data.groupMemberships.forEach(this.rootStore.groupMemberships.add);
        this.isLoaded = true;
      });
      return models;
    } finally {
      this.isFetching = false;
    }
  };

  inCollection = (collectionId: string, query?: string) => {
    const memberships = filter(
      this.rootStore.collectionGroupMemberships.orderedData,
      (member) => member.collectionId === collectionId
    );
    const groupIds = memberships.map((member) => member.groupId);
    const groups = filter(this.orderedData, (group) =>
      groupIds.includes(group.id)
    );
    if (!query) {
      return groups;
    }
    return queriedGroups(groups, query);
  };

  notInCollection = (collectionId: string, query = "") => {
    const memberships = filter(
      this.rootStore.collectionGroupMemberships.orderedData,
      (member) => member.collectionId === collectionId
    );
    const groupIds = memberships.map((member) => member.groupId);
    const groups = filter(
      this.orderedData,
      (group) => !groupIds.includes(group.id)
    );
    if (!query) {
      return groups;
    }
    return queriedGroups(groups, query);
  };
}

function queriedGroups(groups: Group[], query: string) {
  return groups.filter((group) =>
    group.name.toLowerCase().match(query.toLowerCase())
  );
}
