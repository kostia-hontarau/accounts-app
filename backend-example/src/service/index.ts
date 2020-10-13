import "dotenv/config";
import "newrelic";
import * as Awilix from "awilix";
import bootstrappers from "./bootstrappers";
import { logger } from "./modules/logger";

async function start() {
  const container = Awilix.createContainer();
  const applicationLogger = logger.child({ loggerType: "application" });
  container.register({
    applicationLogger: Awilix.asValue(applicationLogger),
    logger: Awilix.aliasTo("applicationLogger"),
  });

  try {
    applicationLogger.info("Bootstrapping application...");
    for (const bootstrapper of bootstrappers) {
      await bootstrapper(container);
    }
    applicationLogger.info("Application initialization finished.");
  } catch (error) {
    applicationLogger.error(error, "Failed to bootstrap the application");

    process.exit(1);
  }
}

start();
