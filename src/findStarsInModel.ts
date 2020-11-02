import { Item } from "./types/item.type";
import { Model } from "./types/model.type";
import { Planet } from "./types/planet.type";
import { Star } from "./types/star.type";

type Condition = (i: Item) => boolean;

export function findStarsInModel(model: Model, home: string, condition: Condition): Star[] {
  return Object.values(model.StarList)
    .map(m => createStar(m, condition))
    .filter(star => star.name === home || star.planets.length > 0);
}

function createStar(starModel: any, condition: Condition): Star {
  return {
    x: starModel.X,
    y: starModel.Y,
    name: starModel.StarName,
    planets: createPlanets(starModel.PlanetList, condition)
  };
}

function createPlanets(planetsModel: any, condition: Condition): Planet[] {
  return Object.values(planetsModel)
    .map(p => createPlanet(p, condition))
    .filter(planet => planet && planet.items.length > 0);
}

function createPlanet(planetModel: any, condition: Condition): Planet {
  if (!planetModel.Treasure) { return null; }
  return {
    name: planetModel.PlanetName,
    items: findItems(planetModel.Treasure, condition)
  };
}

function findItems(treasure: any, condition: Condition): string[] {
  return Object.values(treasure)
    .map(toItemModel)
    .filter(item => item)
    .filter(condition)
    .map(item => item.IName);
}

function toItemModel(itemModel: any): any {
  const field = Object.keys(itemModel).find(f => f.startsWith("ItemId"));
  return itemModel[field];
}
