import { getIndent } from "./getIndent";
import { Model } from "./types/model.type";

export function parseModel(dump: string[]): Model {
  const result = {};
  parseObject(dump, result, 0);
  return result;
}

const fieldRegex = /^([^=]+)=(.*)$/;

function parseObject(dump: string[], obj: any, index: number): number {
  if (dump[index].trim().startsWith("}")) { return index + 1; }
  const indent = getIndent(dump[index]);
  while (index < dump.length) {
    const currentIndent = getIndent(dump[index]);
    if (currentIndent === indent - 1) { // closing bracket, no integrity check
      return index + 1;
    }

    if (currentIndent === indent) { // field
      const trim = dump[index].trim();
      if (trim.endsWith("^{")) {
        const objectName = trim.substr(0, trim.length - 3);
        obj[objectName] = {};
        index = parseObject(dump, obj[objectName], index + 1);
        continue;
      }

      const match = trim.match(fieldRegex);
      if (match != null) {
        obj[match[1]] = getValue(match[2]);
        index += 1;
        continue;
      }
      throw new Error(`Can't figure field type ${index}, ${currentIndent}`);
    }

    throw new Error(`File integrity error, line ${index} `);
  }

  return 0;
}

function getValue(val: string): any {
  const float = parseFloat(val);
  return isNaN(float) ? val : float;
}
