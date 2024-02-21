import crypto from "crypto";
import fs from "fs";
import path from "path";
import { URL } from "url";
import util from "util";
import { subMinutes } from "date-fns";
import {
  InferAttributes,
  InferCreationAttributes,
  type SaveOptions,
} from "sequelize";
import { Op } from "sequelize";
import {
  Column,
  IsLowercase,
  NotIn,
  Default,
  Table,
  Unique,
  IsIn,
  IsDate,
  HasMany,
  Scopes,
  Is,
  DataType,
  IsUUID,
  AllowNull,
  AfterUpdate,
  BeforeUpdate,
  BeforeCreate,
} from "sequelize-typescript";
import { TeamPreferenceDefaults } from "@shared/constants";
import {
  CollectionPermission,
  TeamPreference,
  TeamPreferences,
} from "@shared/types";
import { getBaseDomain, RESERVED_SUBDOMAINS } from "@shared/utils/domains";
import env from "@server/env";
import { ValidationError } from "@server/errors";
import DeleteAttachmentTask from "@server/queues/tasks/DeleteAttachmentTask";
import parseAttachmentIds from "@server/utils/parseAttachmentIds";
import Attachment from "./Attachment";
import AuthenticationProvider from "./AuthenticationProvider";
import Collection from "./Collection";
import Document from "./Document";
import Share from "./Share";
import TeamDomain from "./TeamDomain";
import User from "./User";
import ParanoidModel from "./base/ParanoidModel";
import Fix from "./decorators/Fix";
import IsFQDN from "./validators/IsFQDN";
import IsUrlOrRelativePath from "./validators/IsUrlOrRelativePath";
import Length from "./validators/Length";
import NotContainsUrl from "./validators/NotContainsUrl";

const readFile = util.promisify(fs.readFile);

@Scopes(() => ({
  withDomains: {
    include: [{ model: TeamDomain }],
  },
  withAuthenticationProviders: {
    include: [
      {
        model: AuthenticationProvider,
        as: "authenticationProviders",
      },
    ],
  },
}))
@Table({ tableName: "teams", modelName: "team" })
@Fix
class Team extends ParanoidModel<
  InferAttributes<Team>,
  Partial<InferCreationAttributes<Team>>
> {
  @NotContainsUrl
  @Length({ min: 2, max: 255, msg: "name must be between 2 to 255 characters" })
  @Column
  name: string;

  @IsLowercase
  @Unique
  @Length({
    min: 2,
    max: env.isCloudHosted ? 32 : 255,
    msg: `subdomain must be between 2 and ${
      env.isCloudHosted ? 32 : 255
    } characters`,
  })
  @Is({
    args: [/^[a-z\d-]+$/, "i"],
    msg: "Must be only alphanumeric and dashes",
  })
  @NotIn({
    args: [RESERVED_SUBDOMAINS],
    msg: "You chose a restricted word, please try another.",
  })
  @Column
  subdomain: string | null;

  @Unique
  @Length({ max: 255, msg: "domain must be 255 characters or less" })
  @IsFQDN
  @Column
  domain: string | null;

  @IsUUID(4)
  @Column(DataType.UUID)
  defaultCollectionId: string | null;

  @AllowNull
  @IsUrlOrRelativePath
  @Length({ max: 4096, msg: "avatarUrl must be 4096 characters or less" })
  @Column(DataType.STRING)
  get avatarUrl() {
    const original = this.getDataValue("avatarUrl");

    if (original && !original.startsWith("https://tiley.herokuapp.com")) {
      return original;
    }

    return null;
  }

  set avatarUrl(value: string | null) {
    this.setDataValue("avatarUrl", value);
  }

  @Default(true)
  @Column
  sharing: boolean;

  @Default(false)
  @Column
  inviteRequired: boolean;

  @Column(DataType.JSONB)
  signupQueryParams: { [key: string]: string } | null;

  @Default(true)
  @Column
  guestSignin: boolean;

  @Default(true)
  @Column
  documentEmbeds: boolean;

  @Default(true)
  @Column
  memberCollectionCreate: boolean;

  @Default("member")
  @IsIn([["viewer", "member"]])
  @Column
  defaultUserRole: string;

  @AllowNull
  @Column(DataType.JSONB)
  preferences: TeamPreferences | null;

  @IsDate
  @Column
  suspendedAt: Date | null;

  @IsDate
  @Column
  lastActiveAt: Date | null;

  // getters

  /**
   * Returns whether the team has been suspended and is no longer accessible.
   */
  get isSuspended(): boolean {
    return !!this.suspendedAt;
  }

  /**
   * Returns whether the team has email login enabled. For self-hosted installs
   * this also considers whether SMTP connection details have been configured.
   *
   * @return {boolean} Whether to show email login options
   */
  get emailSigninEnabled(): boolean {
    return this.guestSignin && (!!env.SMTP_HOST || env.isDevelopment);
  }

  get url() {
    const url = new URL(env.URL);

    // custom domain
    if (this.domain) {
      return `${url.protocol}//${this.domain}${url.port ? `:${url.port}` : ""}`;
    }

    if (!this.subdomain || !env.isCloudHosted) {
      return env.URL;
    }

    url.host = `${this.subdomain}.${getBaseDomain()}`;
    return url.href.replace(/\/$/, "");
  }

  /**
   * Returns a code that can be used to delete the user's team. The code will
   * be rotated when the user signs out.
   *
   * @returns The deletion code.
   */
  public getDeleteConfirmationCode(user: User) {
    return crypto
      .createHash("md5")
      .update(`${this.id}${user.jwtSecret}`)
      .digest("hex")
      .replace(/[l1IoO0]/gi, "")
      .slice(0, 8)
      .toUpperCase();
  }

  /**
   * Preferences that decide behavior for the team.
   *
   * @param preference The team preference to set
   * @param value Sets the preference value
   * @returns The current team preferences
   */
  public setPreference = <T extends keyof TeamPreferences>(
    preference: T,
    value: TeamPreferences[T]
  ) => {
    if (!this.preferences) {
      this.preferences = {};
    }

    this.preferences = {
      ...this.preferences,
      [preference]: value,
    };

    return this.preferences;
  };

  /**
   * Returns the value of the given preference.
   *
   * @param preference The team preference to retrieve
   * @returns The preference value if set, else the default value
   */
  public getPreference = (preference: TeamPreference) =>
    this.preferences?.[preference] ??
    TeamPreferenceDefaults[preference] ??
    false;

  /**
   * Updates the lastActiveAt timestamp to the current time.
   *
   * @param force Whether to force the update even if the last update was recent
   * @returns A promise that resolves with the updated team
   */
  public updateActiveAt = async (force = false) => {
    const fiveMinutesAgo = subMinutes(new Date(), 5);

    // ensure this is updated only every few minutes otherwise
    // we'll be constantly writing to the DB as API requests happen
    if (!this.lastActiveAt || this.lastActiveAt < fiveMinutesAgo || force) {
      this.lastActiveAt = new Date();
    }

    // Save only writes to the database if there are changes
    return this.save({
      hooks: false,
    });
  };

  provisionFirstCollection = async (userId: string) => {
    await this.sequelize!.transaction(async (transaction) => {
      const collection = await Collection.create(
        {
          name: "Welcome",
          description: `This collection is a quick guide to what ${env.APP_NAME} is all about. Feel free to delete this collection once your team is up to speed with the basics!`,
          teamId: this.id,
          createdById: userId,
          sort: Collection.DEFAULT_SORT,
          permission: CollectionPermission.ReadWrite,
        },
        {
          transaction,
        }
      );

      // For the first collection we go ahead and create some intitial documents to get
      // the team started. You can edit these in /server/onboarding/x.md
      const onboardingDocs = [
        "Integrations & API",
        "Our Editor",
        "Getting Started",
        "What is Outline",
      ];

      for (const title of onboardingDocs) {
        const text = await readFile(
          path.join(process.cwd(), "server", "onboarding", `${title}.md`),
          "utf8"
        );
        const document = await Document.create(
          {
            version: 2,
            isWelcome: true,
            parentDocumentId: null,
            collectionId: collection.id,
            teamId: collection.teamId,
            lastModifiedById: collection.createdById,
            createdById: collection.createdById,
            title,
            text,
          },
          { transaction }
        );
        await document.publish(collection.createdById, collection.id, {
          transaction,
        });
      }
    });
  };

  public collectionIds = async function (paranoid = true) {
    const models = await Collection.findAll({
      attributes: ["id"],
      where: {
        teamId: this.id,
        permission: {
          [Op.ne]: null,
        },
      },
      paranoid,
    });
    return models.map((c) => c.id);
  };

  /**
   * Find whether the passed domain can be used to sign-in to this team. Note
   * that this method always returns true if no domain restrictions are set.
   *
   * @param domain The domain to check
   * @returns True if the domain is allowed to sign-in to this team
   */
  public isDomainAllowed = async function (
    this: Team,
    domain: string
  ): Promise<boolean> {
    const allowedDomains = (await this.$get("allowedDomains")) || [];

    return (
      allowedDomains.length === 0 ||
      allowedDomains.map((d: TeamDomain) => d.name).includes(domain)
    );
  };

  // associations

  @HasMany(() => Collection)
  collections: Collection[];

  @HasMany(() => Document)
  documents: Document[];

  @HasMany(() => User)
  users: User[];

  @HasMany(() => AuthenticationProvider)
  authenticationProviders: AuthenticationProvider[];

  @HasMany(() => TeamDomain)
  allowedDomains: TeamDomain[];

  // hooks

  @BeforeCreate
  static async setPreferences(model: Team) {
    // Set here rather than in TeamPreferenceDefaults as we only want to enable by default for new
    // workspaces.
    model.setPreference(TeamPreference.MembersCanInvite, true);

    // Set last active at on creation.
    model.lastActiveAt = new Date();

    return model;
  }

  @BeforeUpdate
  static async checkDomain(model: Team, options: SaveOptions) {
    if (!model.domain) {
      return model;
    }

    model.domain = model.domain.toLowerCase();

    const count = await Share.count({
      ...options,
      where: {
        domain: model.domain,
      },
    });

    if (count > 0) {
      throw ValidationError("Domain is already in use");
    }

    return model;
  }

  @AfterUpdate
  static deletePreviousAvatar = async (model: Team) => {
    const previousAvatarUrl = model.previous("avatarUrl");
    if (previousAvatarUrl && previousAvatarUrl !== model.avatarUrl) {
      const attachmentIds = parseAttachmentIds(previousAvatarUrl, true);
      if (!attachmentIds.length) {
        return;
      }

      const attachment = await Attachment.findOne({
        where: {
          id: attachmentIds[0],
          teamId: model.id,
        },
      });

      if (attachment) {
        await DeleteAttachmentTask.schedule({
          attachmentId: attachment.id,
          teamId: model.id,
        });
      }
    }
  };
}

export default Team;
