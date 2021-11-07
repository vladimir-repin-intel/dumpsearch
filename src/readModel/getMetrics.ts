import { Metric } from "../metric.type";
import { readModel } from "./readModel";

export function getMetrics(folder: string, files: string[]): Metric[] {
  const func = require("../../../../dumpMetric.js");
  return files.map(file => {
    const model = readModel(folder, file);
    const metric = func.getMetric(model);
    return {
      ...metric,
      file
    };
  });
}
