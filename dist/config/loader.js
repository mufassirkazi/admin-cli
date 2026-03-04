import fs from "node:fs";
export function loadConfig(path) {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
}
