import { getSaveMetrics } from "./getSaveMetrics";

async function searchDumps(): Promise<void> {
  const start = new Date().getTime();
  const folder = process.argv[2];
  const metrics = await getSaveMetrics(folder);
  const ordered = metrics.sort((m1, m2) => m2.metric - m1.metric);
  const end = new Date().getTime();
  const sec = (end - start) / 1000;

  const resultsLength = (+process.argv[3]) || 20;
  const sliced = ordered.slice(0, resultsLength);
  console.log(`Processed ${metrics.length} save files, in ${sec} seconds`);
  console.log(`top ${sliced.length} results:`);
  sliced.forEach(r => {
    console.log(`save: ${r.file}, metric ${r.metric}`);
    console.log(r.print);
  });
}

searchDumps();
