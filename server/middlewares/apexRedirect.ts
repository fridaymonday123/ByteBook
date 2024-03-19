import { Context, Next } from "koa";

export default function apexRedirect() {
  return async function apexRedirectMiddleware(ctx: Context, next: Next) {
    if (ctx.headers.host === "bytebook.ai") {
      ctx.redirect(`https://www.${ctx.headers.host}${ctx.path}`);
    } else {
      return next();
    }
  };
}
