import fs from "fs";

const report = {
  nodeVersion: process.version,
  esm: true,
  timestamp: new Date().toISOString()
};

fs.writeFileSync("migration-report.json", JSON.stringify(report, null, 2));
console.log("Migration report generated.");
