import pino from "pino";

export const logger = pino({
  customLevels: {
    trace: 100,
    debug: 100,
    info: 200,
    warn: 400,
    error: 500,
    fatal: 600,
  },
  useOnlyCustomLevels: true,
  levelKey: "severity",
  prettyPrint: process.env.NODE_ENV === "development",
});

export interface ILogger {
  debug: (payload: any) => void;
  info: (payload: any) => void;
  warn: (payload: any) => void;
  error: (payload: any) => void;
  child: (payload: any) => ILogger;
}
