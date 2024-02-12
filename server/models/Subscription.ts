import {
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  Table,
  IsIn,
  Scopes,
} from "sequelize-typescript";
import Document from "./Document";
import User from "./User";
import ParanoidModel from "./base/ParanoidModel";
import Fix from "./decorators/Fix";

@Scopes(() => ({
  withUser: {
    include: [
      {
        association: "user",
      },
    ],
  },
}))
@Table({ tableName: "subscriptions", modelName: "subscription" })
@Fix
class Subscription extends ParanoidModel {
  @BelongsTo(() => User, "userId")
  user: User;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => Document, "documentId")
  document: Document | null;

  @ForeignKey(() => Document)
  @Column(DataType.UUID)
  documentId: string | null;

  @IsIn([["documents.update"]])
  @Column(DataType.STRING)
  event: string;
}

export default Subscription;
