import { BaseError } from "../../modules/base-error";

export class BusinessValidationError extends BaseError {
  constructor(message: string, meta?: Record<string, unknown>) {
    super(message, "error.business.validation", meta);
  }
}
