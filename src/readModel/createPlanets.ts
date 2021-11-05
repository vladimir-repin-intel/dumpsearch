import { Item, Planet, Race } from "../searchModel/searchModel.type";

export function createPlanets(planetModels: any, item: Item): Planet[] {
  return planetModels.filter(p => p.Owner !== "None").map(p => createPlanet(p, item));
}

const races: Record<string, Race> = {
  "Fei": "fei",
  "Maloc": "maloc",
  "Gaal": "gaal",
  "Peleng": "peleng",
  "People": "human"
};

function createPlanet(planetModel: any, item: Item): Planet {
  const race = races[planetModel.Race];
  const isGaal = race === "gaal";
  const size = (+planetModel.ISize - 50) / 10;
  return {
    ...item,
    name: planetModel.PlanetName,
    race,
    isGaal,
    isGaalOrFei: isGaal || race === "fei",
    isIndustrial: planetModel.Economy === "Industrial",
    isAgricultural: planetModel.Economy === "Agriculture",
    size
  };
}
