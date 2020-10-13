import { BaseError } from "../../modules/base-error";

export class AccountNotFoundError extends BaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, "error.business.accountNotFound", meta);
  }
}
