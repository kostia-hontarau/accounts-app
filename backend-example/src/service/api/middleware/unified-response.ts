import * as Koa from "koa";

export const unifiedResponse: Koa.Middleware = async function unifiedResponse(
  ctx,
  next
): Promise<void> {
  try {
    await next();
  } finally {
    ctx.status = ctx.status !== 204 ? ctx.status : 200;
    ctx.body = {
      data: ctx.body,
      requestId: ctx.state.id,
    };
  }
};
