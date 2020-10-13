import * as Koa from "koa";

const isClientError = (
  error: Error & { status?: string | number }
): boolean => {
  return Boolean(
    error && error.status && error.status.toString().startsWith("4")
  );
};

export const errorHandler: Koa.Middleware = async function errorHandler(
  ctx,
  next
) {
  try {
    await next();
  } catch (error) {
    const logger = ctx.scope.resolve("logger");
    logger.error(error);

    ctx.status = error.status || 500;
    ctx.body = {
      error: isClientError(error) ? error.message : "Internal Server Error",
    };
  }
};
