import Router from "koa-router";
import { Sequelize, Op } from "sequelize";
import pinCreator from "@server/commands/pinCreator";
import pinDestroyer from "@server/commands/pinDestroyer";
import pinUpdater from "@server/commands/pinUpdater";
import auth from "@server/middlewares/authentication";
import validate from "@server/middlewares/validate";
import { Collection, Document, Pin } from "@server/models";
import { authorize } from "@server/policies";
import {
  presentPin,
  presentDocument,
  presentPolicies,
} from "@server/presenters";
import { APIContext } from "@server/types";
import pagination from "../middlewares/pagination";
import * as T from "./schema";

const router = new Router();

router.post(
  "pins.create",
  auth(),
  validate(T.PinsCreateSchema),
  async (ctx: APIContext<T.PinsCreateReq>) => {
    const { documentId, collectionId, index } = ctx.input.body;
    const { user } = ctx.state.auth;
    const document = await Document.findByPk(documentId, {
      userId: user.id,
    });
    authorize(user, "read", document);

    if (collectionId) {
      const collection = await Collection.scope({
        method: ["withMembership", user.id],
      }).findByPk(collectionId);
      authorize(user, "update", collection);
      authorize(user, "pin", document);
    } else {
      authorize(user, "pinToHome", document);
    }

    const pin = await pinCreator({
      user,
      documentId,
      collectionId,
      ip: ctx.request.ip,
      index,
    });

    ctx.body = {
      data: presentPin(pin),
      policies: presentPolicies(user, [pin]),
    };
  }
);

router.post(
  "pins.list",
  auth(),
  validate(T.PinsListSchema),
  pagination(),
  async (ctx: APIContext<T.PinsCreateReq>) => {
    const { collectionId } = ctx.input.body;
    const { user } = ctx.state.auth;

    const [pins, collectionIds] = await Promise.all([
      Pin.findAll({
        where: {
          ...(collectionId
            ? { collectionId }
            : { collectionId: { [Op.is]: null } }),
          teamId: user.teamId,
        },
        order: [
          Sequelize.literal('"pin"."index" collate "C"'),
          ["updatedAt", "DESC"],
        ],
        offset: ctx.state.pagination.offset,
        limit: ctx.state.pagination.limit,
      }),
      user.collectionIds(),
    ]);

    const documents = await Document.defaultScopeWithUser(user.id).findAll({
      where: {
        id: pins.map((pin) => pin.documentId),
        collectionId: collectionIds,
      },
    });

    const policies = presentPolicies(user, [...documents, ...pins]);

    ctx.body = {
      pagination: ctx.state.pagination,
      data: {
        pins: pins.map(presentPin),
        documents: await Promise.all(
          documents.map((document: Document) => presentDocument(document))
        ),
      },
      policies,
    };
  }
);

router.post(
  "pins.update",
  auth(),
  validate(T.PinsUpdateSchema),
  async (ctx: APIContext<T.PinsUpdateReq>) => {
    const { id, index } = ctx.input.body;
    const { user } = ctx.state.auth;
    let pin = await Pin.findByPk(id, { rejectOnEmpty: true });

    const document = await Document.findByPk(pin.documentId, {
      userId: user.id,
    });

    if (pin.collectionId) {
      authorize(user, "pin", document);
    } else {
      authorize(user, "update", pin);
    }

    pin = await pinUpdater({
      user,
      pin,
      ip: ctx.request.ip,
      index,
    });

    ctx.body = {
      data: presentPin(pin),
      policies: presentPolicies(user, [pin]),
    };
  }
);

router.post(
  "pins.delete",
  auth(),
  validate(T.PinsDeleteSchema),
  async (ctx: APIContext<T.PinsDeleteReq>) => {
    const { id } = ctx.input.body;

    const { user } = ctx.state.auth;
    const pin = await Pin.findByPk(id, { rejectOnEmpty: true });

    const document = await Document.findByPk(pin.documentId, {
      userId: user.id,
    });

    if (pin.collectionId) {
      authorize(user, "unpin", document);
    } else {
      authorize(user, "delete", pin);
    }

    await pinDestroyer({ user, pin, ip: ctx.request.ip });

    ctx.body = {
      success: true,
    };
  }
);

export default router;
