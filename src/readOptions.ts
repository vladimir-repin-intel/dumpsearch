import { IOptions } from "./types/options.type";
import * as fse from "fs-extra";

export function readOptions(): IOptions {
  const file = fse.readFileSync("../dumpsearchConfig.json", "utf8");
  const options = JSON.parse(file);
  return options;
}
