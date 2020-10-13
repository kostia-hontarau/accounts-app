import * as Awilix from "awilix";
import { AccountController } from "../api/v1/controllers/account";
import { AccountRepository } from "../data-access/repository";
import { AccountService } from "../business/services";
import { ILogger, logger } from "../modules/logger";

export const bootstrap = async (
  container: Awilix.AwilixContainer
): Promise<void> => {
  const logger = container.resolve<ILogger>("logger");
  logger.info("Registration of application dependencies...");

  container.register({
    accountController: Awilix.asClass(AccountController),
    accountService: Awilix.asClass(AccountService),
    accountRepository: Awilix.asClass(AccountRepository),
  });

  logger.info("Registration completed.");
};
