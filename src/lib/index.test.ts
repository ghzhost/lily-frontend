import { describe, expect, it } from "vitest";

import * as lib from "@/lib";

describe("src/lib barrel exports", () => {
  it("exports all expected client and error symbols from @/lib", () => {
    expect(typeof lib.lilyFetch).toBe("function");
    expect(typeof lib.toLilyApiError).toBe("function");
    expect(typeof lib.LilyApiError).toBe("function");
    expect(typeof lib.isLilyApiError).toBe("function");
    expect(typeof lib.handleApiResponse).toBe("function");
  });

  it("allows instantiating LilyApiError from barrel export", () => {
    const error = new lib.LilyApiError("Test error", 400, "BAD_REQUEST");
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(lib.LilyApiError);
    expect(lib.isLilyApiError(error)).toBe(true);
    expect(error.status).toBe(400);
    expect(error.code).toBe("BAD_REQUEST");
  });
});
