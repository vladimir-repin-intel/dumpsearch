import { readOptions } from "./readOptions";
import * as fse from "fs-extra";
const extension = ".txt";

function searchDump(): void {
  const file = process.argv[2];
  const fullFile = file.endsWith(extension) ? file : file + extension;
  const options = readOptions();
  const fileContents = fse.readFileSync(options.savesPath + fullFile);

}


searchDump();
