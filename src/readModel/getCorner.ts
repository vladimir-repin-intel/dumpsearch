import { getHomeName } from "./getHomeName";
import { Model } from "./model.type";

export interface Point { x: number; y: number; }

export function getCorner(model: Model): Point {
  const homeName = getHomeName(model);
  const stars: any[] = Object.values(model.StarList);
  let left = Math.min(...stars.map(s => s.X));
  let right = Math.max(...stars.map(s => s.X));
  let top = Math.min(...stars.map(s => s.Y));
  let bottom = Math.max(...stars.map(s => s.Y));
  let home = stars.find(s => s.StarName === homeName);
  const x = home.X - left < right - home.X ? left : right;
  const y = home.Y - top < bottom - home.Y ? top : bottom;
  return { x, y };
}
