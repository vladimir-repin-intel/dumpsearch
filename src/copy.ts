import fs from "fs-extra";
import { getSaveMetrics } from "./getSaveMetrics";

async function copy(from: string, to: string, threshold: number): Promise<void> {
  if (to == null || to === "" || threshold == null || threshold === 0) { return; }
  const metrics = await getSaveMetrics(from);
  const filtered = metrics.filter(m => m.metric >= threshold);

  await Promise.all(filtered.map(f => {
    const file = f.file.replace(".txt", ".sav_");
    return fs.copyFile(from + "/" + file, to + "/" + file);
  }));
}

const folder = process.argv[2];
const destination = process.argv[3];
const threshold = +process.argv[4];
copy(folder, destination, threshold);
