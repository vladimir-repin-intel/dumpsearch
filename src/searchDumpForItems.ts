import { findStarsInModel } from "./findStarsInModel";
import { parseModel } from "./parseModel";
import { printStars, filterStarsByDistance } from "./printStars";
import { Item } from "./types/item.type";
import { Options } from "./types/options.type";
import { findIndustrialPlanets } from "./findIndustrialPlanets";
import { Model } from "./types/model.type";
import { Star } from "./types/star.type";
import { flatMap } from "@b08/array";
import { findHome } from "./findHome";

function countPlanets(stars: Star[]): number {
  return flatMap(stars, star => star.planets).length;
}

function printIndustrials(model: Model, options: Options): string {
  const industrial = findIndustrialPlanets(model);
  const proximity = filterStarsByDistance(industrial, options.home, options.proximity || 20);
  const vicinity = filterStarsByDistance(industrial, options.home, options.vicinity || 30);
  return `Industrial planets/stars in proximity (${options.proximity}): ${countPlanets(proximity)}/${proximity.length}
Industrial planets/stars in vicinity (${options.vicinity}): ${countPlanets(vicinity)}/${vicinity.length}
`;
}

export function searchDumpForItems(dump: string[], options: Options): string {
  const model = parseModel(dump);
  options.home = findHome(model, options.home);
  const artifacts = findStarsInModel(model, options.home, i => isArtifact(i, options));
  const modules = findStarsInModel(model, options.home, i => isBlackholeItem(i, options));
  const industrialLine = printIndustrials(model, options);
  const line = industrialLine + "artifacts:\n" + printStars(artifacts, options) +
    "modules:\n" + printStars(modules, options);
  if (options.showAllArtifacts) {
    const allArtifacts = findStarsInModel(model, options.home, i => i.IType.startsWith("Art"));
    return line + "all artifacts:\n" + printStars(allArtifacts, { ...options, distanceLimit: 200 });
  }

  return line;
}

function isArtifact(item: Item, options: Options): boolean {
  return options.artifacts.some(a => includes(item.IName, a));
}

function isBlackholeItem(item: Item, options: Options): boolean {
  return item.Owner === "None" && options.sizeLimit >= item.Size && options.blackHoleModules.some(b => includes(item.IName, b));
}

function includes(s1: string, s2: string): boolean {
  return s1.toLowerCase().includes(s2.toLowerCase());
}
