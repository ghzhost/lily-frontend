import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

describe("CI workflow configuration (issue #461)", () => {
  it("defines exactly one root concurrency block and one audit job", async () => {
    const content = await readFile(
      resolve(process.cwd(), ".github/workflows/ci.yml"),
      "utf8",
    );

    const concurrencyMatches = content.match(/^concurrency:\s*$/gm);
    expect(concurrencyMatches).toHaveLength(1);

    const auditJobMatches = content.match(/^\s{2}dependency-audit:\s*$/gm);
    expect(auditJobMatches).toHaveLength(1);

    expect(content).toContain("group: ${{ github.workflow }}-${{ github.ref }}");
    expect(content).toContain("cancel-in-progress: true");
    expect(content).toContain("npm audit --omit=dev --audit-level=high");
  });
});
