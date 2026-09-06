import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CopyButton } from "./copy-button";

describe("CopyButton", () => {
  const originalClipboard = navigator.clipboard;

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: originalClipboard,
    });
  });

  it("copies text and shows the confirmation state", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<CopyButton text="LILLY_API_KEY" />);

    await userEvent.click(screen.getByRole("button", { name: /copy/i }));

    expect(writeText).toHaveBeenCalledWith("LILLY_API_KEY");
    expect(
      screen.getByRole("button", { name: /copied/i }),
    ).toBeInTheDocument();
  });

  it("shows a failure state when clipboard copy fails", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: vi.fn().mockReturnValue(false),
    });

    render(<CopyButton text="blocked" />);

    await userEvent.click(screen.getByRole("button", { name: /copy/i }));

    expect(
      screen.getByRole("button", { name: /copy failed/i }),
    ).toBeInTheDocument();
  });

  it("supports a custom label prop", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<CopyButton text="payload" label="Grab key" />);

    const button = screen.getByRole("button", { name: "Grab key" });
    await userEvent.click(button);

    expect(writeText).toHaveBeenCalledWith("payload");
    expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument();
  });

  it("resets to the idle label after the confirmation timeout", async () => {
    const setTimeoutSpy = vi.spyOn(window, "setTimeout");

    try {
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText },
      });

      render(<CopyButton text="reset-me" />);

      const button = screen.getByRole("button", { name: /^copy$/i });
      await userEvent.click(button);

      expect(
        screen.getByRole("button", { name: /copied/i }),
      ).toBeInTheDocument();

      const resetCall = setTimeoutSpy.mock.calls.find(
        (call) => call[1] === 2000,
      );
      expect(resetCall).toBeDefined();

      act(() => {
        (resetCall?.[0] as () => void)();
      });

      expect(
        screen.getByRole("button", { name: /^copy$/i }),
      ).toBeInTheDocument();
    } finally {
      setTimeoutSpy.mockRestore();
    }
  });
});
