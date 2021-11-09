import { Metric } from "../metric.type";
import { readModel } from "./readModel";

export async function getMetrics(folder: string, files: string[]): Promise<Metric[]> {
  const func = require("../../../../dumpMetric.js");
  const promises = files.map( async file => {
    const model = await readModel(folder, file);
    const metric = func.getMetric(model);
    return {
      ...metric,
      file
    };
  });
  return await Promise.all(promises);
}
