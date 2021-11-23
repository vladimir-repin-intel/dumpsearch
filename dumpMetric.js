const inProximity = (item) => item.cornerDistance <= 35;
const inRect = (item) => item.horizontalDistance <= 30 && item.cornerDistance <= 60;
const isScience = planet => planet.isIndustrial && planet.isGaalOrFei;
const isProduce = planet => planet.isIndustrial && (planet.race == "peleng" || planet.race == "maloc");
const size = planet => planet.size;
const isAccelerator = art => art.name.includes("ускоритель");
const isAfterburner = art => art.name.includes("планатор");
const isBeacon = art => art.name.includes("маяк");

function getMetric(model) {
  const rectStars = model.stars.filter(inRect);
  const closerToCorner = rectStars.filter(s => s !== model.home).filter(p => p.cornerDistance <= model.home.cornerDistance);
  const closerToSide = rectStars.filter(s => s !== model.home).filter(p => p.verticalDistance <= model.home.verticalDistance);
  const closer = closerToCorner.length / 2 + closerToSide.length / 2;
  const homeCorneredMetric = 30 - closer * 15;

  const piratePresence = model.planets.filter(inProximity).filter(p => p.pirateOwned);
  const piratePresenceMetric = 20 - piratePresence.length * 3;

  const sciencePlanets = model.planets.filter(inRect).filter(isScience).map(p => p.size);
  const scienceMetric = sciencePlanets.reduce((a, b) => a + b, 0);
  const producePlanets = model.planets.filter(inRect).filter(isProduce).map(p => p.size);
  const produceMetric = producePlanets.reduce((a, b) => a + b, 0);

  const arts = model.artifacts.filter(inProximity);
  const accelMetric = (arts.some(isAccelerator) ? 30 : 0) + (arts.some(isAfterburner) ? 25 : 0);
  const beaconMetric = arts.filter(isBeacon).length * 10;
  const engines = model.engines.filter(inProximity).filter(e => e.weight <= 45).sort((e1, e2) => e2.level - e1.level);
  const engineMetric = engines.length ? engines[0].level * 10 : 0;

  const launchersMetric = model.launchers.filter(inProximity).filter(e => e.weight <= 25 && e.level > 1).length * 5;

  const print = `corner ${closerToCorner.length} ${closerToSide.length} ${model.home.horizontalDistance}\r\n` +
    `planets ${sciencePlanets.length} ${scienceMetric} ${producePlanets.length} ${produceMetric} pirates ${piratePresenceMetric}\r\n` +
    `accelerator ${accelMetric} beacon ${beaconMetric} engine ${engineMetric} launchers ${launchersMetric}`;

  let metric = homeCorneredMetric + piratePresenceMetric + scienceMetric + produceMetric
    + accelMetric + beaconMetric + engineMetric + launchersMetric;

  const isolated = closerToCorner.length < 2 || (closerToSide.length < 2 && model.home.horizontalDistance < 10);
  if (accelMetric >= 20 && scienceMetric >= 25 && produceMetric >= 8 && engineMetric > 10 && isolated) { metric += 150; }
  else if (accelMetric >= 20 && scienceMetric >= 18 && produceMetric >= 5 && engineMetric > 10 && isolated) { metric += 80; }

  return {
    metric,
    print
  };
}

module.exports = {
  getMetric
};
