import { SearchModel, Star } from "../searchModel/searchModel.type";
import fs from "fs";
import IConv from "iconv";
import { parseModel } from "./parseModel";
import { createStars } from "./createStars";
import { getHomeName } from "./getHomeName";
import { flatMap } from "@b08/array";

interface StarsModel {
  home: string;
  stars: Star[];
}

export function readModel(folder: string, fileName: string, index: number): SearchModel {
  console.log(`reading file ${index}`);
  let starsModel = tryReadStarsJson(folder, fileName);
  if (starsModel == null) {
    const buffer = fs.readFileSync(folder + "/" + fileName);
    const dump = new (<any>IConv).Iconv("CP1251", "utf8").convert(buffer, "cp1251").toString();
    const dumpLines = dump.split("\r\n");
    const model = parseModel(dumpLines);
    const home = getHomeName(model);
    const stars = createStars(model);
    starsModel = { stars, home };
    writeStarsJson(folder, fileName, starsModel);
  }
  const parsed = createModel(fileName, starsModel);
  return parsed;
}

function tryReadStarsJson(folder: string, fileName: string): StarsModel {
  const name = folder + "/" + fileName + ".json";
  if (!fs.existsSync(name)) { return null; }
  const content = fs.readFileSync(name, "utf-8");
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