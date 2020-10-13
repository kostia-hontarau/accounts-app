import * as koaApp from "./koa-app";
import * as mongodb from "./mongodb";
import * as passport from "./passport";
import * as registration from "./registration";

export default [
  mongodb.bootstrap,
  registration.bootstrap,
  passport.bootstrap,
  koaApp.bootstrap,
];
