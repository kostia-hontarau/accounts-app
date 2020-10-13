export default class ClientFriendlyError extends Error {
  constructor(message, requestId, originalError) {
    super(message);

    this.requestId = requestId;
    this.originalError = originalError;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
