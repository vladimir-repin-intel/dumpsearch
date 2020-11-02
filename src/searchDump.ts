import { readOptions } from "./readOptions";
import * as fs from "fs-extra";
import * as IConv from "iconv";
import { searchDumpForItems } from "./searchDumpForItems";
const extension = ".txt";

function searchDump(): void {
  const file = process.argv[2];
  const fullFile = file.endsWith(extension) ? file : file + extension;
  const options = readOptions();
  const buffer = fs.readFileSync(options.savesPath + fullFile);
  const dump = new (<any>IConv).Iconv("CP1251", "utf8").convert(buffer, "cp1251").toString();
  const dumpLines = dump.split("\r\n");
  const result = searchDumpForItems(dumpLines, options);
  console.log(result);
}


searchDump();
