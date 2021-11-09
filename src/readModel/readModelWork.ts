import {
  Worker, isMainThread, parentPort, workerData
} from "worker_threads";
import { Metric } from "../metric.type";
import { getMetrics } from "./getMetrics";

if (!isMainThread) {
  const { folder, files } = workerData;
  getMetrics(folder, files)
    .then(result => parentPort.postMessage(result))
    .catch(err => {
      console.log("err", err);
      parentPort.postMessage(null);
    });
}

export function readModelWork(folder: string, files: string[]): Promise<Metric[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: {
        folder,
        files
      }
    });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

