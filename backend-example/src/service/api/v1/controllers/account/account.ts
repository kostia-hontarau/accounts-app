import * as Koa from "koa";
import _ from "lodash";
import { AccountService } from "../../../../business/services";
import { Account } from "../../../../business/types";
import { getAuthenticatedAccount } from "../../../helpers/state";
import { BusinessValidationError } from "../../../../business/errors";
import { RequestValidationError } from "../../../errors";
type AccountApiModel = Omit<Account, "passwordHash">;

export class AccountController {
  accountService: AccountService;

  constructor(dependencies: { accountService: AccountService }) {
    this.accountService = dependencies.accountService;
  }

  async get(ctx: Koa.Context) {
    const account = getAuthenticatedAccount(ctx);

    ctx.body = this.mapToAccountApiModel(account);
  }

  async register(ctx: Koa.Context) {
    try {
      const registeredAccount = await this.accountService.register(
        ctx.request.body
      );

      ctx.body = this.mapToAccountApiModel(registeredAccount);
    } catch (error) {
      if (error instanceof BusinessValidationError) {
        throw new RequestValidationError(error.message, error);
      }

      throw error;
    }
  }

  async update(ctx: Koa.Context) {
    const account = getAuthenticatedAccount(ctx);
    if (!account) {
      ctx.throw(401);
    }

    try {
      const updatedAccount = await this.accountService.update(
        account.email,
        ctx.request.body
      );
      if (ctx.request.body.email && ctx.request.body.email !== account.email) {
        ctx.logout();
      }

      ctx.body = this.mapToAccountApiModel(updatedAccount);
    } catch (error) {
      if (error instanceof BusinessValidationError) {
        throw new RequestValidationError(error.message, error);
      }

      throw error;
    }
  }

  async remove(ctx: Koa.Context) {
    const account = getAuthenticatedAccount(ctx);
    if (!account) {
      ctx.throw(401);
    }

    await this.accountService.remove(account.email);
    ctx.logout();

    ctx.body = {
      success: true,
    };
  }

  private mapToAccountApiModel(
    account: Account | null
  ): AccountApiModel | null {
    return account ? _.omit(account, "passwordHash") : null;
  }
}
