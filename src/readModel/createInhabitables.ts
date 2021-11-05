import { except } from "@b08/array";
import { Artifact, Equipment, Inhabitable, Item } from "../searchModel/searchModel.type";

export function createInhabitables(planetModels: any, item: Item): Inhabitable[] {
  return planetModels.filter(p => p.Owner === "None").map(p => createInhabitable(p, item));
}

function createInhabitable(planetModel: any, item: Item): Inhabitable {
  const treasures = Object.values(planetModel.Treasure)
    .filter(val => val !== "")
    .map(obj => {
      const field = Object.keys(obj).find(f => f.startsWith("ItemId"));
      return obj[field];
    });

  const equipment = createEquipments(treasures, item);
  const artifacts = createArtifacts(treasures, item);
  const engines = equipment.filter(isEngine);
  const launchers = equipment.filter(isLauncher);
  const restOfEquipment = except(equipment, engines.concat(launchers));
  return {
    ...item,
    name: planetModel.PlanetName,
    artifacts,
    engines,
    launchers,
    restOfEquipment
  };
}
function isEngine(eq: Equipment): boolean {
  return eq.type === "Engine";
}
function isLauncher(eq: Equipment): boolean {
  return eq.type === "W04";
}

function createEquipments(treasureModels: any[], item: Item): Equipment[] {
  return treasureModels.filter(i => !i.IType.startsWith("Art"))
    .map(i => createEquipment(i, item));
}

function createEquipment(itemModel: any, item: Item): Equipment {
  return {
    ...item,
    type: itemModel.IType,
    weight: itemModel.Size,
    level: itemModel.TechLevel
  };
}

function createArtifacts(treasureModels: any[], item: Item): Artifact[] {
  return treasureModels.filter(i => i.IType.startsWith("Art")).map(i => createArtifact(i, item));
}

function createArtifact(itemModel: any, item: Item): Artifact {
  return {
    ...item,
    name: itemModel.IName,
    weight: itemModel.Size
  };
}
