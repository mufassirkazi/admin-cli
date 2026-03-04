import os from "node:os";
export function legacyReport() {
    return os.platform();
}
