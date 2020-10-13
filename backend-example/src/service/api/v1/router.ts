import Router from "koa-router";
import {
  AccountController,
  accountValidationSchemas,
} from "./controllers/account";
import { schemaValidation } from "../middleware/schema-validation";
import { requestHandler } from "../middleware/request-handler";
import { authentication } from "../middleware/authentication";
import passport from "passport";

export const router = new Router({
  prefix: "/api/v1/",
});

router.post(
  "account/login",
  schemaValidation(accountValidationSchemas.login),
  passport.authenticate("local"),
  requestHandler(AccountController, "get")
);
router.post("account/logout", authentication, (ctx) => {
  ctx.logout();
  ctx.status = 200;
});

router.get("account", requestHandler(AccountController, "get"));
router.post(
  "account",
  schemaValidation(accountValidationSchemas.register),
  requestHandler(AccountController, "register")
);

router.patch(
  "account",
  authentication,
  schemaValidation(accountValidationSchemas.update),
  requestHandler(AccountController, "update")
);
router.del(
  "account",
  authentication,
  requestHandler(AccountController, "remove")
);
