const os = require("node:os");

export function legacyReport(): string {
  return os.platform();
}
