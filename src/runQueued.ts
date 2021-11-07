import { splitInGroupsBy } from "@b08/array";
import os from "os";
const cpus = os.cpus().length;
const divisor = cpus * 4;
export function runQueued<TS, TR>(items: TS[], func: (i: TS[]) => Promise<TR[]>,
  groupBy: number = items.length / divisor, queueDepth: number = cpus): Promise<TR[]> {
  var groups = splitInGroupsBy(items, groupBy);
  const map = new Map<TS[], Promise<TR[]>>();

  return new Promise<TR[]>((resolve, reject) => {
    while (map.size < queueDepth) {
      enqueue();
    }

    const result: TR[] = [];

    function enqueue(): void {
      if (map.size > queueDepth) { return; }
      const item = groups.shift();
      if (item == null) {
        if (map.size === 0) { resolve(result); }
        return;
      }
      const promise = func(item);
      map.set(item, promise);
      promise.then(r => {
        result.push(...r);
        map.delete(item);
        enqueue();
      }).catch(reject);
    }
  });
}
