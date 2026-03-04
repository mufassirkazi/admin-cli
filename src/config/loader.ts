
const fs = require("fs");

export function loadConfig(path: string): unknown {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}
