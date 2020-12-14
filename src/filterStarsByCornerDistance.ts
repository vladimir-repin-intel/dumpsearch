import { Point } from "./types/point.type";
import { Star } from "./types/star.type";

export function filterStarsByCornerDistance(stars: Star[], homeStar: string, limit: number): Star[] {
  const corner = findCorner(stars, homeStar);
  return stars
    .filter(s => getDistance(s, corner) <= limit);
}

export function findCorner(stars: Star[], homeStar: string): Point {
  let left = stars[0].x;
  let right = stars[0].x;
  let top = stars[0].y;
  let bottom = stars[0].y;
  let home: Star;
  stars.forEach(s => {
    left = Math.min(left, s.x);
    right = Math.max(right, s.x);
    top = Math.min(top, s.y);
    bottom = Math.max(bottom, s.y);
    if (s.name === homeStar) { home = s; }
  });

  const x = home.x - left < right - home.x ? left : right;
  const y = home.y - top < bottom - home.y ? top : bottom;
  return { x, y };
}

export function getDistance(a: Point, b: Point): number {
  const distanceX = Math.abs(a.x - b.x);
  const distanceY = Math.abs(a.y - b.y);
  return Math.ceil(Math.sqrt(distanceX * distanceX + distanceY * distanceY));
}
