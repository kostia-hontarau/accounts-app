import * as Koa from "koa";

export const authentication: Koa.Middleware = async function authentication(
  ctx,
  next
): Promise<void> {
  if (ctx.isUnauthenticated()) {
    ctx.throw(401);
  }

  await next();
};
