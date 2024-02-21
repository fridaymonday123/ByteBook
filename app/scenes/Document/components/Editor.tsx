import { observer } from "mobx-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { mergeRefs } from "react-merge-refs";
import { useHistory, useRouteMatch } from "react-router-dom";
import { richExtensions, withComments } from "@shared/editor/nodes";
import { TeamPreference } from "@shared/types";
import Comment from "~/models/Comment";
import Document from "~/models/Document";
import { RefHandle } from "~/components/ContentEditable";
import { useDocumentContext } from "~/components/DocumentContext";
import Editor, { Props as EditorProps } from "~/components/Editor";
import Flex from "~/components/Flex";
import BlockMenuExtension from "~/editor/extensions/BlockMenu";
import ClipboardTextSerializer from "~/editor/extensions/ClipboardTextSerializer";
import EmojiMenuExtension from "~/editor/extensions/EmojiMenu";
import FindAndReplaceExtension from "~/editor/extensions/FindAndReplace";
import HoverPreviewsExtension from "~/editor/extensions/HoverPreviews";
import Keys from "~/editor/extensions/Keys";
import MentionMenuExtension from "~/editor/extensions/MentionMenu";
import PasteHandler from "~/editor/extensions/PasteHandler";
import PreventTab from "~/editor/extensions/PreventTab";
import SmartText from "~/editor/extensions/SmartText";
import useCurrentTeam from "~/hooks/useCurrentTeam";
import useCurrentUser from "~/hooks/useCurrentUser";
import useFocusedComment from "~/hooks/useFocusedComment";
import usePolicy from "~/hooks/usePolicy";
import useStores from "~/hooks/useStores";
import {
  documentHistoryPath,
  documentPath,
  matchDocumentHistory,
} from "~/utils/routeHelpers";
import MultiplayerEditor from "./AsyncMultiplayerEditor";
import DocumentMeta from "./DocumentMeta";
import DocumentTitle from "./DocumentTitle";

const extensions = [
  ...withComments(richExtensions),
  SmartText,
  PasteHandler,
  ClipboardTextSerializer,
  BlockMenuExtension,
  EmojiMenuExtension,
  MentionMenuExtension,
  FindAndReplaceExtension,
  HoverPreviewsExtension,
  // Order these default key handlers last
  PreventTab,
  Keys,
];

type Props = Omit<EditorProps, "editorStyle"> & {
  onChangeTitle: (title: string) => void;
  onChangeEmoji: (emoji: string | null) => void;
  id: string;
  document: Document;
  isDraft: boolean;
  multiplayer?: boolean;
  onSave: (options: {
    done?: boolean;
    autosave?: boolean;
    publish?: boolean;
  }) => void;
  children: React.ReactNode;
};

/**
 * The main document editor includes an editable title with metadata below it,
 * and support for commenting.
 */
function DocumentEditor(props: Props, ref: React.RefObject<any>) {
  const titleRef = React.useRef<RefHandle>(null);
  const { t } = useTranslation();
  const match = useRouteMatch();
  const focusedComment = useFocusedComment();
  const { ui, comments } = useStores();
  const user = useCurrentUser({ rejectOnEmpty: false });
  const team = useCurrentTeam({ rejectOnEmpty: false });
  const history = useHistory();
  const {
    document,
    onChangeTitle,
    onChangeEmoji,
    isDraft,
    shareId,
    readOnly,
    children,
    multiplayer,
    ...rest
  } = props;
  const can = usePolicy(document);

  const childRef = React.useRef<HTMLDivElement>(null);
  const focusAtStart = React.useCallback(() => {
    if (ref.current) {
      ref.current.focusAtStart();
    }
  }, [ref]);

  React.useEffect(() => {
    if (focusedComment) {
      ui.expandComments(document.id);
    }
  }, [focusedComment, ui, document.id]);

  // Save document when blurring title, but delay so that if clicking on a
  // button this is allowed to execute first.
  const handleBlur = React.useCallback(() => {
    setTimeout(() => props.onSave({ autosave: true }), 250);
  }, [props]);

  const handleGoToNextInput = React.useCallback(
    (insertParagraph: boolean) => {
      if (insertParagraph && ref.current) {
        const { view } = ref.current;
        const { dispatch, state } = view;
        dispatch(state.tr.insert(0, state.schema.nodes.paragraph.create()));
      }

      focusAtStart();
    },
    [focusAtStart, ref]
  );

  const handleClickComment = React.useCallback(
    (commentId: string) => {
      history.replace({
        pathname: window.location.pathname.replace(/\/history$/, ""),
        state: { commentId },
      });
    },
    [history]
  );

  // Create a Comment model in local store when a comment mark is created, this
  // acts as a local draft before submission.
  const handleDraftComment = React.useCallback(
    (commentId: string, createdById: string) => {
      if (comments.get(commentId) || createdById !== user?.id) {
        return;
      }

      const comment = new Comment(
        {
          documentId: props.id,
          createdAt: new Date(),
          createdById,
        },
        comments
      );
      comment.id = commentId;
      comments.add(comment);

      history.replace({
        pathname: window.location.pathname.replace(/\/history$/, ""),
        state: { commentId },
      });
    },
    [comments, user?.id, props.id, history]
  );

  // Soft delete the Comment model when associated mark is totally removed.
  const handleRemoveComment = React.useCallback(
    async (commentId: string) => {
      const comment = comments.get(commentId);
      if (comment?.isNew) {
        await comment?.delete();
      }
    },
    [comments]
  );

  const { setEditor } = useDocumentContext();
  const handleRefChanged = React.useCallback(setEditor, [setEditor]);
  const EditorComponent = multiplayer ? MultiplayerEditor : Editor;

  return (
    <Flex auto column>
      <DocumentTitle
        ref={titleRef}
        readOnly={readOnly}
        documentId={document.id}
        title={
          !document.title && readOnly
            ? document.titleWithDefault
            : document.title
        }
        emoji={document.emoji}
        emojiPosition={document.fullWidth ? "top" : "side"}
        onChangeTitle={onChangeTitle}
        onChangeEmoji={onChangeEmoji}
        onGoToNextInput={handleGoToNextInput}
        onBlur={handleBlur}
        placeholder={t("Untitled")}
      />
      {!shareId && (
        <DocumentMeta
          document={document}
          to={
            match.path === matchDocumentHistory
              ? documentPath(document)
              : documentHistoryPath(document)
          }
          rtl={
            titleRef.current?.getComputedDirection() === "rtl" ? true : false
          }
        />
      )}
      <EditorComponent
        ref={mergeRefs([ref, handleRefChanged])}
        autoFocus={!!document.title && !props.defaultValue}
        placeholder={t("Type '/' to insert, or start writing…")}
        scrollTo={decodeURIComponent(window.location.hash)}
        readOnly={readOnly}
        shareId={shareId}
        userId={user?.id}
        focusedCommentId={focusedComment?.id}
        onClickCommentMark={handleClickComment}
        onCreateCommentMark={
          team?.getPreference(TeamPreference.Commenting) && can.comment
            ? handleDraftComment
            : undefined
        }
        onDeleteCommentMark={
          team?.getPreference(TeamPreference.Commenting) && can.comment
            ? handleRemoveComment
            : undefined
        }
        extensions={extensions}
        editorStyle={{
          padding: "0 32px",
          margin: "0 -32px",
          paddingBottom: `calc(50vh - ${
            childRef.current?.offsetHeight || 0
          }px)`,
        }}
        {...rest}
      />
      <div ref={childRef}>{children}</div>
    </Flex>
  );
}

export default observer(React.forwardRef(DocumentEditor));
