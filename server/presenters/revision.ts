import parseTitle from "@shared/utils/parseTitle";
import { traceFunction } from "@server/logging/tracing";
import { Revision } from "@server/models";
import DocumentHelper from "@server/models/helpers/DocumentHelper";
import presentUser from "./user";

async function presentRevision(revision: Revision, diff?: string) {
  // TODO: Remove this fallback once all revisions have been migrated
  const { emoji, strippedTitle } = parseTitle(revision.title);

  return {
    id: revision.id,
    documentId: revision.documentId,
    title: strippedTitle,
    text: DocumentHelper.toMarkdown(revision),
    emoji: revision.emoji ?? emoji,
    html: diff,
    createdAt: revision.createdAt,
    createdBy: presentUser(revision.user),
  };
}

export default traceFunction({
  spanName: "presenters",
})(presentRevision);
