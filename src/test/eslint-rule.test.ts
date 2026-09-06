import { readFile } from "node:fs/promises";
import path from "node:path";

import { ESLint } from "eslint";

describe("project ESLint rules", () => {
  it("rejects target=_blank links without rel=noopener noreferrer", async () => {
    const fixturePath = path.resolve(
      process.cwd(),
      "src/test/eslint/unsafe-target-blank.tsx.txt",
    );
    const fixture = await readFile(fixturePath, "utf8");
    const eslint = new ESLint();

    const [result] = await eslint.lintText(fixture, {
      filePath: "src/test/eslint/unsafe-target-blank.tsx",
    });

    expect(result?.messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: "react/jsx-no-target-blank",
          severity: 2,
        }),
      ]),
    );
  });
});
