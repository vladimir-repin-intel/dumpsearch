import { SearchModel, Star } from "../searchModel/searchModel.type";
import fs from "fs-extra";
import IConv from "iconv";
import { parseModel } from "./parseModel";
import { createStars } from "./createStars";
import { getHomeName } from "./getHomeName";
import { flatMap } from "@b08/array";

interface StarsModel {
  home: string;
  stars: Star[];
}

export async function readModel(folder: string, fileName: string): Promise<SearchModel> {
  let starsModel = await tryReadStarsJson(folder, fileName);
  if (starsModel == null) {
    try {
      const buffer = await fs.readFile(folder + "/" + fileName);

      const dump = new (<any>IConv).Iconv("CP1251", "utf8").convert(buffer, "cp1251").toString();
      const dumpLines = dump.split("\r\n");
      const model = parseModel(dumpLines);
      const home = getHomeName(model);
      const stars = createStars(model);
      starsModel = { stars, home };
    } catch (ex) {
      const error: Error = ex;
      console.log(fileName, ex.message, error.stack);
      throw ex;
    }
    writeStarsJson(folder, fileName, starsModel);
  }
  const parsed = createModel(fileName, starsModel);
  return parsed;
}

async function tryReadStarsJson(folder: string, fileName: string): Promise<StarsModel> {
  const name = folder + "/" + fileName + ".json";
  if (!fs.existsSync(name)) { return null; }
  const content = await fs.readFile(name, "utf-8");
  return JSON.parse(content);
}

function writeStarsJson(folder: string, fileName: string, stars: StarsModel): void {
  const content = JSON.stringify(stars);
  const name = folder + "/" + fileName + ".json";
  fs.writeFileSync(name, content, "utf-8");
}

function createModel(fileName: string, starsModel: StarsModel): SearchModel {
  const stars = starsModel.stars;
  const inhabitable = flatMap(stars, stars => stars.inhabitable);
  return {
    fileName,
    home: starsModel.stars.find(star => star.name === starsModel.home),
    stars,
    planets: flatMap(starsModel.stars, star => star.planets),
    inhabitable,
    artifacts: flatMap(inhabitable, i => i.artifacts),
    engines: flatMap(inhabitable, i => i.engines),
    launchers: flatMap(inhabitable, i => i.launchers),
    restOfEquipment: flatMap(inhabitable, i => i.restOfEquipment)
  };
}
