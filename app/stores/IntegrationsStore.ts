import filter from "lodash/filter";
import { computed } from "mobx";
import { IntegrationService } from "@shared/types";
import naturalSort from "@shared/utils/naturalSort";
import RootStore from "~/stores/RootStore";
import Store from "~/stores/base/Store";
import Integration from "~/models/Integration";

class IntegrationsStore extends Store<Integration> {
  constructor(rootStore: RootStore) {
    super(rootStore, Integration);
  }

  @computed
  get orderedData(): Integration[] {
    return naturalSort(Array.from(this.data.values()), "name");
  }

  @computed
  get slackIntegrations(): Integration[] {
    return filter(this.orderedData, {
      service: IntegrationService.Slack,
    });
  }
}

export default IntegrationsStore;
