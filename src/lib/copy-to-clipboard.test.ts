import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { copyToClipboard } from "./clipboard";

describe("copyToClipboard", () => {
  beforeEach(() => {
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should copy text using navigator.clipboard when available", async () => {
    const result = await copyToClipboard("test text");
    
    expect(result.success).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test text");
  });

  it("should call onSuccess callback on successful copy", async () => {
    const onSuccess = vi.fn();
    await copyToClipboard("test text", { onSuccess });
    
    expect(onSuccess).toHaveBeenCalled();
  });

  it("should return success false and call onError when clipboard fails", async () => {
    const error = new Error("Clipboard failed");
    vi.mocked(navigator.clipboard.writeText).mockRejectedValue(error);
    
    const onError = vi.fn();
    const result = await copyToClipboard("test text", { onError });
    
    expect(result.success).toBe(false);
    expect(result.error).toBe(error);
    expect(onError).toHaveBeenCalledWith(error);
  });

  it("should fallback to execCommand when clipboard API is unavailable", async () => {
    // Remove clipboard API
    Object.assign(navigator, { clipboard: undefined });
    // Mock execCommand which may not exist in JSDOM
    document.execCommand = vi.fn().mockReturnValue(true);
    
    // Mock document methods
    const mockTextarea = {
      value: "",
      style: {} as Record<string, string>,
      select: vi.fn(),
    };
    const createElementSpy = vi.spyOn(document, "createElement").mockReturnValue(mockTextarea as unknown as HTMLTextAreaElement);
    const appendChildSpy = vi.spyOn(document.body, "appendChild").mockImplementation((node) => node);
    const removeChildSpy = vi.spyOn(document.body, "removeChild").mockImplementation((node) => node);

    const result = await copyToClipboard("fallback text");

    expect(result.success).toBe(true);
    expect(createElementSpy).toHaveBeenCalledWith("textarea");
    expect(mockTextarea.value).toBe("fallback text");
    expect(mockTextarea.select).toHaveBeenCalled();
    expect(document.execCommand).toHaveBeenCalledWith("copy");
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
  });
});
