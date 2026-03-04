import { deploy } from "../commands/deploy.js";
test("deploy works", () => {
    expect(deploy()).toBe("deployed");
});
