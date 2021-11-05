import fs from "fs";
import { readModel } from "./readModel/readModel";
const extension = ".txt";

interface Metric {
  file: string;
  metric: number;
  print: string;
}

function getSaveMetrics(): Metric[] {
  const folder = process.argv[2];
  const files = fs.readdirSync(folder).filter(f => f.endsWith(extension));
  const func = require("../../../dumpMetric.js");
  console.log(`found ${files.length} files`);
  const results = files.map((file, index) => {
    const model = readModel(folder, file, index);
    const metric = func.getMetric(model);
    return {
      ...metric,
      file
    };
  }
  );

  return results;
}

function searchDumps(): void {
  const metrics = getSaveMetrics();
  const ordered = metrics.sort((m1, m2) => m2.metric - m1.metric).slice(0, 20);

  console.log("top 20 results:");
  ordered.forEach(r => {
    console.log(`save: ${r.file}, metric ${r.metric}`);
    console.log(r.print);
  });
}

searchDumps();
