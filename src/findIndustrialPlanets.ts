import { Model } from "./types/model.type";
import { Star } from "./types/star.type";

export function findIndustrialPlanets(model: Model): Star[] {
  const stars = Object.values(model.StarList)
    .map(createIndustrialStar);
  return stars;
}

function createIndustrialStar(starModel: Model): Star {
  return {
    name: starModel.StarName,
    x: starModel.X,
    y: starModel.Y,
    planets: Object.values(starModel.PlanetList)
      .filter((p: any) => p.Owner !== "None" && p.Economy === "Industrial")
      .map((model: any) => ({ name: model.PlanetName, items: [] }))
  };
}
