import { MobXProviderContext } from "mobx-react";
import * as React from "react";
import RootStore from "~/stores";

export default function useStores() {
  return React.useContext(MobXProviderContext) as typeof RootStore;
}
