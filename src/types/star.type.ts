import { Planet } from "./planet.type";

export interface Star {
  name: string;
  x: number;
  y: number;
  planets: Planet[];
}
