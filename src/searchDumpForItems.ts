import { findStarsInModel } from "./findStarsInModel";
import { parseModel } from "./parseModel";
import { printStars, } from "./printStars";
import { Item } from "./types/item.type";
import { Options } from "./types/options.type";
import { findIndustrialPlanets } from "./findIndustrialPlanets";
import { Model } from "./types/model.type";
import { Star } from "./types/star.type";
import { flatMap } from "@b08/array";
import { findHome } from "./findHome";
import { filterStarsByCornerDistance } from "./filterStarsByCornerDistance";

function countPlanets(stars: Star[]): number {
  return flatMap(stars, star => star.planets).length;
}

function printIndustrials(model: Model, options: Options): string {
  const industrial = findIndustrialPlanets(model);
  const core = filterStarsByCornerDistance(industrial, options.home, options.cornerProximity || 20);
  const fullCorner = filterStarsByCornerDistance(industrial, options.home, options.cornerDistance || 40);
  return `Core Industrial planets/stars (${options.cornerProximity}): ${countPlanets(core)}/${core.length}
Outer rim Industrial planets/stars (${options.cornerDistance}): ${countPlanets(fullCorner)}/${fullCorner.length}
`;
}

export function searchDumpForItems(dump: string[], options: Options): string {
  const model = parseModel(dump);
  options.home = findHome(model, options.home);
  const artifacts = findStarsInModel(model, options.home, i => isArtifact(i, options));
  const industrialLine = printIndustrials(model, options);
  const line = industrialLine + "artifacts:\n" + printStars(artifacts, options);
  if (options.showAllArtifacts) {
    const allArtifacts = findStarsInModel(model, options.home, i => i.IType.startsWith("Art"));
    return line + "all artifacts:\n" + printStars(allArtifacts, { ...options, cornerDistance: 300 });
  }

  return line;
}

function isArtifact(item: Item, options: Options): boolean {
  return options.artifacts.some(a => includes(item.IName, a)) && options.sizeLimit >= item.Size;
}

function includes(s1: string, s2: string): boolean {
  return s1.toLowerCase().includes(s2.toLowerCase());
}
