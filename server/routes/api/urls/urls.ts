import dns from "dns";
import Router from "koa-router";
import { getBaseDomain, parseDomain } from "@shared/utils/domains";
import parseDocumentSlug from "@shared/utils/parseDocumentSlug";
import parseMentionUrl from "@shared/utils/parseMentionUrl";
import { isInternalUrl } from "@shared/utils/urls";
import { NotFoundError, ValidationError } from "@server/errors";
import auth from "@server/middlewares/authentication";
import { rateLimiter } from "@server/middlewares/rateLimiter";
import validate from "@server/middlewares/validate";
import { Document, Share, Team, User } from "@server/models";
import { authorize } from "@server/policies";
import { presentDocument, presentMention } from "@server/presenters/unfurls";
import presentUnfurl from "@server/presenters/unfurls/unfurl";
import { APIContext } from "@server/types";
import { RateLimiterStrategy } from "@server/utils/RateLimiter";
import resolvers from "@server/utils/unfurl";
import * as T from "./schema";

const router = new Router();

router.post(
  "urls.unfurl",
  rateLimiter(RateLimiterStrategy.OneThousandPerHour),
  auth(),
  validate(T.UrlsUnfurlSchema),
  async (ctx: APIContext<T.UrlsUnfurlReq>) => {
    const { url, documentId } = ctx.input.body;
    const { user: actor } = ctx.state.auth;
    const urlObj = new URL(url);

    // Mentions
    if (urlObj.protocol === "mention:") {
      if (!documentId) {
        throw ValidationError("Document ID is required to unfurl a mention");
      }
      const { modelId: userId } = parseMentionUrl(url);

      const [user, document] = await Promise.all([
        User.findByPk(userId),
        Document.findByPk(documentId, {
          userId: actor.id,
        }),
      ]);
      if (!user) {
        throw NotFoundError("Mentioned user does not exist");
      }
      if (!document) {
        throw NotFoundError("Document does not exist");
      }
      authorize(actor, "read", user);
      authorize(actor, "read", document);

      ctx.body = await presentMention(user, document);
      return;
    }

    // Internal resources
    if (isInternalUrl(url) || parseDomain(url).host === actor.team.domain) {
      const previewDocumentId = parseDocumentSlug(url);
      if (previewDocumentId) {
        const document = previewDocumentId
          ? await Document.findByPk(previewDocumentId, { userId: actor.id })
          : undefined;
        if (!document) {
          throw NotFoundError("Document does not exist");
        }
        authorize(actor, "read", document);

        ctx.body = presentDocument(document, actor);
        return;
      }
      return (ctx.response.status = 204);
    }

    // External resources
    if (resolvers.Iframely) {
      const data = await resolvers.Iframely.unfurl(url);
      return data.error
        ? (ctx.response.status = 204)
        : (ctx.body = presentUnfurl(data));
    }

    return (ctx.response.status = 204);
  }
);

router.post(
  "urls.validateCustomDomain",
  rateLimiter(RateLimiterStrategy.OneHundredPerHour),
  auth(),
  validate(T.UrlsCheckCnameSchema),
  async (ctx: APIContext<T.UrlsCheckCnameReq>) => {
    const { hostname } = ctx.input.body;

    const [team, share] = await Promise.all([
      Team.findOne({
        where: {
          domain: hostname,
        },
      }),
      Share.findOne({
        where: {
          domain: hostname,
        },
      }),
    ]);
    if (team || share) {
      throw ValidationError("Domain is already in use");
    }

    let addresses;
    try {
      addresses = await new Promise<string[]>((resolve, reject) => {
        dns.resolveCname(hostname, (err, addresses) => {
          if (err) {
            return reject(err);
          }
          return resolve(addresses);
        });
      });
    } catch (err) {
      if (err.code === "ENOTFOUND") {
        throw NotFoundError("No CNAME record found");
      }

      throw ValidationError("Invalid domain");
    }

    if (addresses.length === 0) {
      throw ValidationError("No CNAME record found");
    }

    const address = addresses[0];
    const likelyValid = address.endsWith(getBaseDomain());

    if (!likelyValid) {
      throw ValidationError("CNAME is not configured correctly");
    }

    ctx.body = {
      success: true,
    };
  }
);

export default router;
