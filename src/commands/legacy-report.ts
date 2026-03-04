import os from "node:os";

export function legacyReport(): string {
  return os.platform();
}
