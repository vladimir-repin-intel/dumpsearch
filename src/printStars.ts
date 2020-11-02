import { flatMap } from "@b08/array";
import { Options } from "./types/options.type";
import { Planet } from "./types/planet.type";
import { Star } from "./types/star.type";

export function printStars(stars: Star[], options: Options): string {
  const home = stars.find(s => s.name === options.home);
  stars = stars
    .filter(s => getDistance(s, home) <= options.distanceLimit)
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
  return ` distance: ${distance}, star: ${star.name}, planet: ${planet.name}, items: ${planet.items.join(", ")}\n`;
}


