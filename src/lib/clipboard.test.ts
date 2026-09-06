import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { copyText } from "./clipboard";

describe("copyText", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
    // jsdom does not implement execCommand; stub it for fallback tests
    if (typeof document.execCommand !== "function") {
      (document as Document & { execCommand: (cmd: string) => boolean }).execCommand =
        vi.fn().mockReturnValue(true);
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uses navigator.clipboard when available", async () => {
    const result = await copyText("hello");
    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
  });

  it("falls back to execCommand when clipboard API throws", async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(new Error("denied"));
    const execSpy = vi.spyOn(document, "execCommand").mockReturnValue(true);

    const result = await copyText("fallback");
    expect(result).toBe(true);
    expect(execSpy).toHaveBeenCalledWith("copy");
  });

  it("returns false when both paths fail", async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(new Error("denied"));
    const execSpy = vi.spyOn(document, "execCommand").mockImplementation(() => {
      throw new Error("nope");
    });

    const result = await copyText("fail");
    expect(result).toBe(false);
    expect(execSpy).toHaveBeenCalled();
  });
});
