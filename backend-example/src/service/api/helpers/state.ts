import * as Koa from "koa";
import { Account } from "../../business/types";

export const getAuthenticatedAccount = (ctx: Koa.Context): Account | null => {
  if (!ctx.state.user) {
    return null;
  }

  return ctx.state.user as Account;
};
