"use strict";
import pino, { pretty as _pretty } from "pino";
const pretty = _pretty({ forceColor: true });
pretty.pipe(process.stdout);
const loglevel = process.env.LOGLEVEL || "warn";
export default pino(
  {
    name: "hots-parser",
    safe: true,
    level: loglevel,
  },
  pretty,
);
