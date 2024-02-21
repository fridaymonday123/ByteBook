import orderBy from "lodash/orderBy";
import { computed } from "mobx";
import Event from "~/models/Event";
import RootStore from "./RootStore";
import Store, { RPCAction } from "./base/Store";

export default class EventsStore extends Store<Event> {
  actions = [RPCAction.List];

  constructor(rootStore: RootStore) {
    super(rootStore, Event);
  }

  @computed
  get orderedData(): Event[] {
    return orderBy(Array.from(this.data.values()), "createdAt", "asc");
  }
}
