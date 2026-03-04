import fs from "node:fs";

export function loadConfig(path: string): unknown {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}
