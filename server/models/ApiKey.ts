import randomstring from "randomstring";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import {
  Column,
  Table,
  Unique,
  BeforeValidate,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import User from "./User";
import ParanoidModel from "./base/ParanoidModel";
import Fix from "./decorators/Fix";
import Length from "./validators/Length";

@Table({ tableName: "apiKeys", modelName: "apiKey" })
@Fix
class ApiKey extends ParanoidModel<
  InferAttributes<ApiKey>,
  Partial<InferCreationAttributes<ApiKey>>
> {
  static prefix = "ol_api_";

  @Length({
    min: 3,
    max: 255,
    msg: "Name must be between 3 and 255 characters",
  })
  @Column
  name: string;

  @Unique
  @Column
  secret: string;

  // hooks

  @BeforeValidate
  static async generateSecret(model: ApiKey) {
    if (!model.secret) {
      model.secret = `${ApiKey.prefix}${randomstring.generate(38)}`;
    }
  }

  /**
   * Validates that the input touch could be an API key, this does not check
   * that the key exists in the database.
   *
   * @param text The text to validate
   * @returns True if likely an API key
   */
  static match(text: string) {
    return !!text.replace(ApiKey.prefix, "").match(/^[\w]{38}$/);
  }

  // associations

  @BelongsTo(() => User, "userId")
  user: User;

  @ForeignKey(() => User)
  @Column
  userId: string;
}

export default ApiKey;
