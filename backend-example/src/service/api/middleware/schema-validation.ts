import * as Koa from "koa";
import { RequestValidationError } from "../errors";
import { ObjectSchema } from "@hapi/joi";

export enum RequestPartType {
  BODY = "body",
  PARAMS = "params",
  QUERY = "query",
  HEADERS = "headers",
}

export type SchemasConfig = Partial<{
  query?: ObjectSchema;
  body?: ObjectSchema;
  params?: ObjectSchema;
  headers?: ObjectSchema;
}>;

function getRequestPart(
  ctx: Koa.ParameterizedContext,
  requestPart: RequestPartType
): NodeJS.Dict<any> {
  if (requestPart === RequestPartType.PARAMS) {
    return ctx.params;
  }

  return ctx.request[requestPart];
}

function setRequestPart(
  ctx: Koa.ParameterizedContext,
  requestPart: RequestPartType,
  value: any
): void {
  if (requestPart === RequestPartType.PARAMS) {
    ctx.params = value;
  } else {
    ctx.request[requestPart] = value;
  }
}

export const schemaValidation = (
  schemas: SchemasConfig | null
): Koa.Middleware => {
  return async function schemaValidation(ctx, next): Promise<void> {
    if (schemas) {
      Object.entries(schemas).forEach(([requestPart, schema]) => {
        const requestPartType = requestPart as RequestPartType;
        if (schema) {
          const requestPart = getRequestPart(ctx, requestPartType);

          const { error, value } = schema.validate(requestPart);

          if (error) {
            throw new RequestValidationError(error.message);
          }

          if (Object.values(RequestPartType).includes(requestPartType)) {
            setRequestPart(ctx, requestPartType, value);
          }
        }
      });
    }

    await next();
  };
};
