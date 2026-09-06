import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RootLoading from "./loading";

describe("RootLoading", () => {
  it("renders loading indicator without crashing", () => {
    render(<RootLoading />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
