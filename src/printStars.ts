import { flatMap } from "@b08/array";
import { Item } from "./types/item.type";
import { Options } from "./types/options.type";
import { Planet } from "./types/planet.type";
import { Star } from "./types/star.type";

export function filterStarsByDistance(stars: Star[], homeStar: string, limit: number): Star[] {
  const home = stars.find(s => s.name === homeStar);
  return stars
    .filter(s => getDistance(s, home) <= limit);
}

export function printStars(stars: Star[], options: Options): string {
  const home = stars.find(s => s.name === options.home);
  stars = filterStarsByDistance(stars, options.home, options.distanceLimit)
    .sort((a, b) => getDistance(a, home) - getDistance(b, home));
  const lines = flatMap(stars, star => getStarLines(star, home));
  return lines.reduce((acc, cur) => acc + cur, "");
}

function getDistance(a: Star, b: Star): number {
  const distanceX = Math.abs(a.x - b.x);
  const distanceY = Math.abs(a.y - b.y);
  return Math.ceil(Math.sqrt(distanceX * distanceX + distanceY * distanceY));
}

function getStarLines(star: Star, home: Star): string[] {
  return star.planets.map(p => getStarLine(star, getDistance(star, home), p));
}

function getStarLine(star: Star, distance: number, planet: Planet): string {
  return ` distance: ${distance}, star: ${star.name}, planet: ${planet.name}, items: ${printItems(planet.items)}\n`;
}

function printItems(items: Item[]): string {
  return items.map(item => `${item.IName}:${item.Size}${tech(item)}`).join(", ");
}
function tech(item: Item): string {
  return item.TechLevel && item.TechLevel > 0
    ? `(${item.TechLevel})`
    : "";
}

