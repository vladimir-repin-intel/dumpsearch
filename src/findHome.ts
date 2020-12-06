import { Model } from "./types/model.type";

export function findHome(model: Model, optionsHome: string): string {
  if (optionsHome != null) {
    return optionsHome;
  }

  const id = model.Player.ICurStarId;
  const idName = "StarId" + id;
  const name = model.StarList[idName].StarName;
  console.log(name);
  return name;
}
