import * as React from "react";
import { basicExtensions, withComments } from "@shared/editor/nodes";
import Editor, { Props as EditorProps } from "~/components/Editor";
import type { Editor as SharedEditor } from "~/editor";
import EmojiMenuExtension from "~/editor/extensions/EmojiMenu";
import MentionMenuExtension from "~/editor/extensions/MentionMenu";

const extensions = [
  ...withComments(basicExtensions),
  EmojiMenuExtension,
  MentionMenuExtension,
];

const CommentEditor = (
  props: EditorProps,
  ref: React.RefObject<SharedEditor>
) => <Editor extensions={extensions} {...props} ref={ref} />;

export default React.forwardRef(CommentEditor);
