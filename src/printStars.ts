import { flatMap } from "@b08/array";
import { filterStarsByCornerDistance, findCorner, getDistance } from "./filterStarsByCornerDistance";
import { Item } from "./types/item.type";
import { Options } from "./types/options.type";
import { Planet } from "./types/planet.type";
import { Point } from "./types/point.type";
import { Star } from "./types/star.type";

export function printStars(stars: Star[], options: Options): string {
  const corner = findCorner(stars, options.home);
  stars = filterStarsByCornerDistance(stars, options.home, options.cornerDistance)
    .sort((a, b) => getDistance(a, corner) - getDistance(b, corner));
  const lines = flatMap(stars, star => getStarLines(star, corner));
  return lines.reduce((acc, cur) => acc + cur, "");
}


function getStarLines(star: Star, corner: Point): string[] {
  return star.planets.map(p => getStarLine(star, getDistance(star, corner), p));
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

