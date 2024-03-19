import { SourceMetadata } from "@shared/types";
import documentCreator from "@server/commands/documentCreator";
import documentImporter from "@server/commands/documentImporter";
import { User } from "@server/models";
import { sequelize } from "@server/storage/database";
import FileStorage from "@server/storage/files";
import BaseTask, { TaskPriority } from "./BaseTask";

type Props = {
  userId: string;
  sourceMetadata: Pick<Required<SourceMetadata>, "fileName" | "mimeType">;
  publish?: boolean;
  collectionId?: string;
  parentDocumentId?: string;
  ip: string;
  key: string;
};

export type DocumentImportTaskResponse =
  | {
      documentId: string;
    }
  | {
      error: string;
    };

export default class DocumentImportTask extends BaseTask<Props> {
  public async perform({
    key,
    sourceMetadata,
    ip,
    publish,
    collectionId,
    parentDocumentId,
    userId,
  }: Props): Promise<DocumentImportTaskResponse> {
    try {
      const content = await FileStorage.getFileBuffer(key);

      const document = await sequelize.transaction(async (transaction) => {
        const user = await User.findByPk(userId, {
          rejectOnEmpty: true,
          transaction,
        });

        const { text, state, title, emoji } = await documentImporter({
          user,
          fileName: sourceMetadata.fileName,
          mimeType: sourceMetadata.mimeType,
          content,
          ip,
          transaction,
        });

        return documentCreator({
          sourceMetadata,
          title,
          emoji,
          text,
          state,
          publish,
          collectionId,
          parentDocumentId,
          user,
          ip,
          transaction,
        });
      });
      return { documentId: document.id };
    } catch (err) {
      return { error: err.message };
    } finally {
      await FileStorage.deleteFile(key);
    }
  }

  public get options() {
    return {
      attempts: 1,
      priority: TaskPriority.Normal,
    };
  }
}
