import Koa from "koa";
import { AwilixContainer, asValue } from "awilix";
import { requestLogger as apiRequestLogger } from "@diegoh/api-request-logger";
import bodyParser from "koa-bodyparser";
import passport from "koa-passport";
import cors from "kcors";
import requestId from "koa-requestid";
import session from "koa-generic-session";

import { createScope } from "../modules/di/helpers";
import { errorHandler } from "../api/middleware/error-handler";
import { ILogger } from "../modules/logger";
import { router } from "../api/v1/router";
import { unifiedResponse } from "../api/middleware/unified-response";
import { MemoryStore } from "../modules/memory-store";

export const bootstrap = async (container: AwilixContainer): Promise<void> => {
  const logger = container.resolve<ILogger>("logger");
  logger.info("Creating Koa application...");

  const app = new Koa();
  app.use(requestId());
  app.use(async function scopeInitilization(ctx: Koa.Context, next: Koa.Next) {
    ctx.scope = createScope(container, {
      loggerType: "request",
      requestId: ctx.state.id,
    });
    ctx.scope.register({
      ctx: asValue(ctx),
    });

    await next();
  });
  app.use(async function requestLogger(ctx: Koa.Context, next: Koa.Next) {
    await apiRequestLogger(ctx.scope.resolve("logger"))(ctx, next);
  });

  app.use(unifiedResponse);
  app.use(errorHandler);
  app.use(bodyParser());
  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
    })
  );

  app.keys = ["my-session-key"];
  app.use(
    session({
      ttl: 60000,
      store: new MemoryStore() as any,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(router.middleware());

  container.register({
    app: asValue(app),
  });

  return new Promise((resolve) => {
    app.listen(process.env.PORT, () => {
      logger.info(
        `Application successfully launched at port ${process.env.PORT}`
      );
      resolve();
    });
  });
};
