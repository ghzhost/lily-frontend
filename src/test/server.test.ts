import { HttpResponse, http } from "msw";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";

import { server } from "./server";

describe("MSW test server", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("mocks fetch responses with a test-scoped handler", async () => {
    server.use(
      http.get("https://api.lily.test/agents", () =>
        HttpResponse.json({ agents: [{ id: "agent-1", name: "Iris" }] }),
      ),
    );

    const response = await fetch("https://api.lily.test/agents");

    expect(response.ok).toBe(true);
    await expect(response.json()).resolves.toEqual({
      agents: [{ id: "agent-1", name: "Iris" }],
    });
  });
});
