import { sync } from "../commands/sync.js";
test("sync works", () => {
    expect(sync()).toBe(true);
});
