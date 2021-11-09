import { Item, Star } from "../searchModel/searchModel.type";
import { createInhabitables } from "./createInhabitables";
import { createPlanets } from "./createPlanets";
import { getCorner, Point } from "./getCorner";
import { Model } from "./model.type";

export function createStars(model: Model): Star[] {
  const corner = getCorner(model);
  return Object.values(model.StarList).map(sm => createStar(sm, corner));
}

function createStar(starModel: any, corner: Point): Star {
  const item = createItem(starModel, corner);
  const planetModels = Object.values(starModel.PlanetList);
  return {
    ...item,
    x: starModel.X,
    y: starModel.Y,
    name: starModel.StarName,
    planets: createPlanets(planetModels, item),
    inhabitable: createInhabitables(planetModels, item)
  };
}

function createItem(starModel: any, corner: Point): Item {
  const horizontalDistance = Math.round(Math.abs(corner.x - starModel.X));
  const verticalDistance = Math.round(Math.abs(corner.y - starModel.Y));
  const cornerDistance = Math.round(Math.sqrt(horizontalDistance * horizontalDistance + verticalDistance * verticalDistance));
  return {
    pirateOwned: starModel.Owners === "Pirates",
    dominatorOwned: starModel.Owners === "Klings",
    cornerDistance,
    horizontalDistance,
    verticalDistance
  };
}
