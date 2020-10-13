export default class Notification {
  constructor({
    title = null,
    description = null,
    type = null,
    config = {},
  } = {}) {
    this.message = title;
    this.description = description;
    this.type = type;
    this.config = config;
  }
}
