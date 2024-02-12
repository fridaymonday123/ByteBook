import { toggleMark } from "prosemirror-commands";
import { Slice } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import { isUrl } from "../../utils/urls";
import Extension from "../lib/Extension";
import isMarkdown from "../lib/isMarkdown";
import normalizePastedMarkdown from "../lib/markdown/normalize";
import isInCode from "../queries/isInCode";
import isInList from "../queries/isInList";
import { LANGUAGES } from "./Prism";

/**
 * Checks if the HTML string is likely coming from Dropbox Paper.
 *
 * @param html The HTML string to check.
 * @returns True if the HTML string is likely coming from Dropbox Paper.
 */
function isDropboxPaper(html: string): boolean {
  return html?.includes("usually-unique-id");
}

function sliceSingleNode(slice: Slice) {
  return slice.openStart === 0 &&
    slice.openEnd === 0 &&
    slice.content.childCount === 1
    ? slice.content.firstChild
    : null;
}

/**
 * Parses the text contents of an HTML string and returns the src of the first
 * iframe if it exists.
 *
 * @param text The HTML string to parse.
 * @returns The src of the first iframe if it exists, or undefined.
 */
function parseSingleIframeSrc(html: string) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    if (
      doc.body.children.length === 1 &&
      doc.body.firstElementChild?.tagName === "IFRAME"
    ) {
      const iframe = doc.body.firstElementChild;
      const src = iframe.getAttribute("src");
      if (src) {
        return src;
      }
    }
  } catch (e) {
    // Ignore the million ways parsing could fail.
  }
  return undefined;
}

export default class PasteHandler extends Extension {
  get name() {
    return "paste-handler";
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          transformPastedHTML(html: string) {
            if (isDropboxPaper(html)) {
              // Fixes double paragraphs when pasting from Dropbox Paper
              html = html.replace(/<div><br><\/div>/gi, "<p></p>");
            }
            return html;
          },
          handleDOMEvents: {
            keydown: (_, event) => {
              if (event.key === "Shift") {
                this.shiftKey = true;
              }
              return false;
            },
            keyup: (_, event) => {
              if (event.key === "Shift") {
                this.shiftKey = false;
              }
              return false;
            },
          },
          handlePaste: (view, event: ClipboardEvent) => {
            // Do nothing if the document isn't currently editable
            if (view.props.editable && !view.props.editable(view.state)) {
              return false;
            }

            // Default behavior if there is nothing on the clipboard or were
            // special pasting with no formatting (Shift held)
            if (!event.clipboardData || this.shiftKey) {
              return false;
            }

            const { state, dispatch } = view;
            const iframeSrc = parseSingleIframeSrc(
              event.clipboardData.getData("text/plain")
            );
            const text =
              iframeSrc && !isInCode(state)
                ? iframeSrc
                : event.clipboardData.getData("text/plain");
            const html = event.clipboardData.getData("text/html");
            const vscode = event.clipboardData.getData("vscode-editor-data");

            // first check if the clipboard contents can be parsed as a single
            // url, this is mainly for allowing pasted urls to become embeds
            if (isUrl(text)) {
              // just paste the link mark directly onto the selected text
              if (!state.selection.empty) {
                toggleMark(this.editor.schema.marks.link, { href: text })(
                  state,
                  dispatch
                );
                return true;
              }

              // Is this link embeddable? Create an embed!
              const { embeds } = this.editor.props;

              if (
                embeds &&
                this.editor.commands.embed &&
                !isInCode(state) &&
                !isInList(state)
              ) {
                for (const embed of embeds) {
                  const matches = embed.matcher(text);
                  if (matches) {
                    this.editor.commands.embed({
                      href: text,
                    });
                    return true;
                  }
                }
              }

              // well, it's not an embed and there is no text selected – so just
              // go ahead and insert the link directly
              const transaction = view.state.tr
                .insertText(text, state.selection.from, state.selection.to)
                .addMark(
                  state.selection.from,
                  state.selection.to + text.length,
                  state.schema.marks.link.create({ href: text })
                );
              view.dispatch(transaction);
              return true;
            }

            // If the users selection is currently in a code block then paste
            // as plain text, ignore all formatting and HTML content.
            if (isInCode(state)) {
              event.preventDefault();

              view.dispatch(state.tr.insertText(text));
              return true;
            }

            // Because VSCode is an especially popular editor that places metadata
            // on the clipboard, we can parse it to find out what kind of content
            // was pasted.
            const vscodeMeta = vscode ? JSON.parse(vscode) : undefined;
            const pasteCodeLanguage = vscodeMeta?.mode;
            const supportsCodeBlock = !!state.schema.nodes.code_block;
            const supportsCodeMark = !!state.schema.marks.code_inline;

            if (pasteCodeLanguage && pasteCodeLanguage !== "markdown") {
              if (text.includes("\n") && supportsCodeBlock) {
                event.preventDefault();
                view.dispatch(
                  state.tr
                    .replaceSelectionWith(
                      state.schema.nodes.code_block.create({
                        language: Object.keys(LANGUAGES).includes(
                          vscodeMeta.mode
                        )
                          ? vscodeMeta.mode
                          : null,
                      })
                    )
                    .insertText(text)
                );
                return true;
              }

              if (supportsCodeMark) {
                event.preventDefault();
                view.dispatch(
                  state.tr
                    .insertText(text, state.selection.from, state.selection.to)
                    .addMark(
                      state.selection.from,
                      state.selection.to + text.length,
                      state.schema.marks.code_inline.create()
                    )
                );
                return true;
              }
            }

            // If the HTML on the clipboard is from Prosemirror then the best
            // compatability is to just use the HTML parser, regardless of
            // whether it "looks" like Markdown, see: outline/outline#2416
            if (html?.includes("data-pm-slice")) {
              return false;
            }

            // If the text on the clipboard looks like Markdown OR there is no
            // html on the clipboard then try to parse content as Markdown
            if (
              (isMarkdown(text) && !isDropboxPaper(html)) ||
              pasteCodeLanguage === "markdown"
            ) {
              event.preventDefault();

              // get pasted content as slice
              const paste = this.editor.pasteParser.parse(
                normalizePastedMarkdown(text)
              );
              if (!paste) {
                return false;
              }

              const slice = paste.slice(0);
              const tr = view.state.tr;
              let currentPos = view.state.selection.from;

              // If the pasted content is a single paragraph then we loop over
              // it's content and insert each node one at a time to allow it to
              // be pasted inline with surrounding content.
              const singleNode = sliceSingleNode(slice);
              if (singleNode?.type === this.editor.schema.nodes.paragraph) {
                singleNode.forEach((node) => {
                  tr.insert(currentPos, node);
                  currentPos += node.nodeSize;
                });
              } else {
                singleNode
                  ? tr.replaceSelectionWith(singleNode, this.shiftKey)
                  : tr.replaceSelection(slice);
              }

              view.dispatch(
                tr
                  .scrollIntoView()
                  .setMeta("paste", true)
                  .setMeta("uiEvent", "paste")
              );
              return true;
            }

            // otherwise use the default HTML parser which will handle all paste
            // "from the web" events
            return false;
          },
        },
      }),
    ];
  }

  /** Tracks whether the Shift key is currently held down */
  private shiftKey = false;
}
