import fs from "fs";
import { Metric } from "./metric.type";
import { readModelWork } from "./readModel/readModelWork";
import { runQueued } from "./runQueued";
export const extension = ".txt";

export async function getSaveMetrics(folder: string): Promise<Metric[]> {
  const files = fs.readdirSync(folder).filter(f => f.endsWith(extension));
  console.log(`found ${files.length} files, processing, plz wait`);

  const results = await runQueued(files, f => readModelWork(folder, f));
  return results;
}
