import Token from "markdown-it/lib/token";
import { NodeSpec } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import { DecorationSet, Decoration } from "prosemirror-view";
import { selectColumn } from "../commands/table";
import { getCellsInRow, isColumnSelected } from "../queries/table";

import Node from "./Node";

export default class TableHeadCell extends Node {
  get name() {
    return "th";
  }

  get schema(): NodeSpec {
    return {
      content: "(paragraph | embed)+",
      tableRole: "header_cell",
      isolating: true,
      parseDOM: [{ tag: "th" }],
      toDOM(node) {
        return [
          "th",
          node.attrs.alignment
            ? { style: `text-align: ${node.attrs.alignment}` }
            : {},
          0,
        ];
      },
      attrs: {
        colspan: { default: 1 },
        rowspan: { default: 1 },
        alignment: { default: null },
      },
    };
  }

  toMarkdown() {
    // see: renderTable
  }

  parseMarkdown() {
    return {
      block: "th",
      getAttrs: (tok: Token) => ({ alignment: tok.info }),
    };
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          decorations: (state) => {
            const { doc } = state;
            const decorations: Decoration[] = [];
            const cells = getCellsInRow(0)(state);

            if (cells) {
              cells.forEach((pos, index) => {
                decorations.push(
                  Decoration.widget(pos + 1, () => {
                    const colSelected = isColumnSelected(index)(state);
                    let className = "grip-column";
                    if (colSelected) {
                      className += " selected";
                    }
                    if (index === 0) {
                      className += " first";
                    } else if (index === cells.length - 1) {
                      className += " last";
                    }
                    const grip = document.createElement("a");
                    grip.className = className;
                    grip.addEventListener("mousedown", (event) => {
                      event.preventDefault();
                      event.stopImmediatePropagation();
                      this.editor.view.dispatch(
                        selectColumn(
                          index,
                          event.metaKey || event.shiftKey
                        )(state)
                      );
                    });
                    return grip;
                  })
                );
              });
            }

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  }
}
