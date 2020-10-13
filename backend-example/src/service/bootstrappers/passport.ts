import { AwilixContainer } from "awilix";
import passport from "koa-passport";
import { Account } from "../business/types";
import { AccountService } from "../business/services";
import { Strategy as LocalStrategy } from "passport-local";

export const bootstrap = (container: AwilixContainer) => {
  passport.serializeUser((account: Account, done) => {
    done(null, account.email);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const accountService = container.resolve<AccountService>(
        "accountService"
      );
      const account = await accountService.get(id);

      done(null, account);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        const accountService = container.resolve<AccountService>(
          "accountService"
        );
        try {
          const account = await accountService.authenticate({
            email,
            password,
          });
          if (!account) {
            done(null, false);
          } else {
            done(null, account);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
