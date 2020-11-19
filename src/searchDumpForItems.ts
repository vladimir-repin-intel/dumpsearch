import { findStarsInModel } from "./findStarsInModel";
import { parseModel } from "./parseModel";
import { printStars } from "./printStars";
import { Item } from "./types/item.type";
import { Options } from "./types/options.type";

export function searchDumpForItems(dump: string[], options: Options): string {
  const model = parseModel(dump);
  const artifacts = findStarsInModel(model, options.home, i => isArtifact(i, options));
  const modules = findStarsInModel(model, options.home, i => isBlackholeItem(i, options));

  const line = "artifacts:\n" + printStars(artifacts, options) +
    "modules:\n" + printStars(modules, options);
  if (options.showAllArtifacts) {
    const allArtifacts = findStarsInModel(model, options.home, i => i.IType.startsWith("Art"));
    return line + "all artifacts:\n" + printStars(allArtifacts, { ...options, distanceLimit: 200 });
  }

  return line;
}

function isArtifact(item: Item, options: Options): boolean {
  return options.artifacts.some(a => item.IName.includes(a));
}

function isBlackholeItem(item: Item, options: Options): boolean {
  return item.Owner === "None" && options.sizeLimit > item.Size && options.blackHoleModules.some(b => item.IName.includes(b));
}
