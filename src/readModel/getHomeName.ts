import { Model } from "./model.type";

export function getHomeName(model: Model): string {
  const id = model.Player.ICurStarId;
  const idName = "StarId" + id;
  const name = model.StarList[idName].StarName;
  return name;
}
