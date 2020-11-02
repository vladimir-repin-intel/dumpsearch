import { Options } from "./types/options.type";
import * as fse from "fs-extra";

export function readOptions(): Options {
  const file = fse.readFileSync("../dumpsearchConfig.json", "utf8");
  const options = JSON.parse(file);
  return options;
}
