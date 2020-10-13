import { Constructor } from "awilix";
import * as Koa from "koa";

function lowercaseFirstLetter(source: string): string {
  return source.charAt(0).toLowerCase() + source.slice(1);
}

export const requestHandler = (
  ControllerClass: Constructor<any>,
  action: string
): Koa.Middleware => {
  if (!ControllerClass || !action) {
    throw new Error("Both controller and action should be specified!");
  }

  return async function requestHandler(ctx, next) {
    const controller = ctx.scope.resolve(
      lowercaseFirstLetter(ControllerClass.name)
    );

    if (!controller[action] || typeof controller[action] !== "function") {
      throw new Error("Action not exists or not a function");
    }

    await controller[action].bind(controller)(ctx);
  };
};
