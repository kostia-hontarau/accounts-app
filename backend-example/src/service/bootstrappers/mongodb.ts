import { asValue, AwilixContainer } from "awilix";
import mongoose, { model } from "mongoose";
import { ILogger } from "../modules/logger";
import { accountSchema } from "../data-access/models";

export const bootstrap = async (container: AwilixContainer): Promise<void> => {
  mongoose.Promise = global.Promise;
  const logger = container.resolve<ILogger>("logger");

  mongoose.connection.on("connecting", function () {
    logger.info("MongoDB: Connecting");
  });

  mongoose.connection.on("error", function () {
    logger.error("MongoDB: Error");
    mongoose.disconnect();
  });

  mongoose.connection.on("open", function () {
    logger.info("MongoDB: Connected");
  });

  mongoose.connection.on("reconnected", function () {
    logger.info("MongoDB: Connection Restablished");
  });

  mongoose.connection.on("disconnected", function () {
    logger.error("MongoDB: Disconnected");
  });

  if (process.env.MONGODB_URL) {
    await mongoose.connect(process.env.MONGODB_URL || "");
  } else if (process.env.MONGODB_HOST) {
    await mongoose.connect(
      `mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`
    );
  } else {
    throw new Error("MONGODB_URL or MONGODB_HOST should be provided");
  }

  container.register({
    accountDataModel: asValue(model("Account", accountSchema)),
  });
};
