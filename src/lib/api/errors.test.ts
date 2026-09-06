import { describe, it, expect } from "vitest";
import { LilyApiError, isLilyApiError, handleApiResponse } from "./errors";

describe("LilyApiError", () => {
  it("stores status, code, message and details", () => {
    const err = new LilyApiError({
      status: 404,
      code: "NOT_FOUND",
      message: "Not found",
      details: [{ field: "id", reason: "missing" }],
    });

    expect(err).toBeInstanceOf(Error);
    expect(err.status).toBe(404);
    expect(err.code).toBe("NOT_FOUND");
    expect(err.message).toBe("Not found");
    expect(err.details).toHaveLength(1);
  });

  it("is detected by type guard", () => {
    const err = new LilyApiError({
      status: 500,
      code: "INTERNAL",
      message: "fail",
    });

    expect(isLilyApiError(err)).toBe(true);
    expect(isLilyApiError(new Error("x"))).toBe(false);
  });
});

describe("handleApiResponse", () => {
  it("does nothing for ok responses", async () => {
    await expect(
      handleApiResponse(new Response(null, { status: 200 })),
    ).resolves.toBeUndefined();
  });

  it("maps JSON error body to LilyApiError", async () => {
    const res = new Response(
      JSON.stringify({ code: "VALIDATION", message: "Bad input", details: [] }),
      { status: 422, statusText: "Unprocessable Entity" },
    );

    try {
      await handleApiResponse(res);
      expect.fail("should throw");
    } catch (e) {
      expect(isLilyApiError(e)).toBe(true);

      if (isLilyApiError(e)) {
        expect(e.status).toBe(422);
        expect(e.code).toBe("VALIDATION");
        expect(e.message).toBe("Bad input");
      }
    }
  });

  it("falls back to status text when body is not JSON", async () => {
    const res = new Response("nope", {
      status: 503,
      statusText: "Service Unavailable",
    });

    try {
      await handleApiResponse(res);
      expect.fail("should throw");
    } catch (e) {
      expect(isLilyApiError(e)).toBe(true);

      if (isLilyApiError(e)) {
        expect(e.status).toBe(503);
        expect(e.code).toBe("UNKNOWN_ERROR");
        expect(e.message).toBe("Service Unavailable");
      }
    }
  });
});
