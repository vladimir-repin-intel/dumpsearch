export interface SearchModel {
  fileName: string;
  home: Star;
  stars: Star[];
  planets: Planet[];
  inhabitable: Inhabitable[];
  artifacts: Artifact[];
  engines: Equipment[];
  launchers: Equipment[];
  restOfEquipment: Equipment[];
}

export interface Item {
  pirateOwned: boolean;
  dominatorOwned: boolean;
  cornerDistance: number;
  horizontalDistance: number;
  verticalDistance: number;
}

export interface Star extends Item {
  x: number;
  y: number;
  name: string;
  planets: Planet[];
  inhabitable: Inhabitable[];
}

export type Race = "gaal" | "fei" | "human" | "peleng" | "maloc";

export interface Planet extends Item {
  name: string;
  isGaal: boolean;
  isGaalOrFei: boolean;
  isIndustrial: boolean;
  isAgricultural: boolean;
  race: Race;
  size: number;
}

export interface Inhabitable extends Item {
  name: string;
  artifacts: Artifact[];
  launchers: Equipment[];
  engines: Equipment[];
  restOfEquipment: Equipment[];
}

export interface Artifact extends Item {
  name: string;
  weight: number;
}

export interface Equipment extends Item {
  type: string;
  weight: number;
  level: number;
}
