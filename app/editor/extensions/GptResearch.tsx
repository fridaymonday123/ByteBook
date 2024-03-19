import { action } from "mobx";
import * as React from "react";
import { WidgetProps } from "@shared/editor/lib/Extension";
import Suggestion from "~/editor/extensions/Suggestion";
import GptResearch from "../components/GptResearch";

export default class GptResearchExtension extends Suggestion {
  get defaultOptions() {
    return {
      // ported from https://github.com/tc39/proposal-regexp-unicode-property-escapes#unicode-aware-version-of-w
      openRegex: /^\ (\w+)?$/,
      closeRegex: /(^(?!\ (\w+)?)(.*)$|^\/(([\w\W]+)\s.*|\s)$|^\/((\W)+)$)/,
      enabledInTable: true,
    };
  }

  get name() {
    return "research-menu";
  }

  widget = ({ rtl }: WidgetProps) => {
    return (
      <GptResearch
        trigger=" "
        active={this.state.open}
        onClose={action(() => {
          this.state.open = false;
        })}
      />)
  };
}
