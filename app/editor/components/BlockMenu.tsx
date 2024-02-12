import React from "react";
import useDictionary from "~/hooks/useDictionary";
import getMenuItems from "../menus/block";
import SuggestionsMenu, {
  Props as SuggestionsMenuProps,
} from "./SuggestionsMenu";
import SuggestionsMenuItem from "./SuggestionsMenuItem";

type Props = Omit<
  SuggestionsMenuProps,
  "renderMenuItem" | "items" | "trigger"
> &
  Required<Pick<SuggestionsMenuProps, "embeds">>;

function BlockMenu(props: Props) {
  const dictionary = useDictionary();

  return (
    <SuggestionsMenu
      {...props}
      filterable
      trigger="/"
      renderMenuItem={(item, _index, options) => (
        <SuggestionsMenuItem
          onClick={options.onClick}
          selected={options.selected}
          icon={item.icon}
          title={item.title}
          shortcut={item.shortcut}
        />
      )}
      items={getMenuItems(dictionary)}
    />
  );
}

export default BlockMenu;
