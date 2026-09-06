 import "@testing-library/jest-dom/vitest";
 import { render, screen } from "@testing-library/react";
 import { describe, expect, it } from "vitest";

 import { PageScaffold } from "../../components/scaffold/page-scaffold";
 import type { RouteScaffold } from "../../types/site";

 const mockRoute: RouteScaffold = {
  id: "test-zoom",
  section: "marketing",
  title: "Long Title That Should Wrap At Two Hundred Percent Zoom Without Overflowing The Viewport",
  purpose: "A very long purpose description that ensures text reflows properly when the browser zoom level is increased to two hundred percent for accessibility compliance testing purposes.",
  path: "/about",
  figmaScope: "Design scope details that also need to wrap gracefully at high zoom levels to prevent horizontal scrolling issues in the layout container.",
  implementationAreas: [
    "Responsive typography scaling",
    "Flexible grid layouts with minmax",
    "Word breaking for long unbroken strings",
  ],
};

 describe("PageScaffold at 200% zoom", () => {
   it("renders without horizontal overflow indicators", () => {
     const { container } = render(
       <PageScaffold
         route={mockRoute}
         dynamicLabel="/marketing/very-long-path-segment-that-might-overflow-if-not-handled-correctly-with-break-all"
       />
     );
     const section = container.querySelector("section.surface") ?? container.firstElementChild;
     expect(section).toBeInTheDocument();
     // Verify break-words and break-all classes are applied to prevent overflow
     expect(section?.innerHTML).toContain("break-words");
     expect(section?.innerHTML).toContain("break-all");
   });

   it("uses fluid typography via clamp for headings", () => {
     render(<PageScaffold route={mockRoute} />);
     const heading = screen.getByRole("heading", { level: 1 });
     expect(heading.className).toMatch(/clamp/);
   });

   it("applies min-w-0 to grid children to allow shrinking below content size", () => {
     render(<PageScaffold route={mockRoute} />);
     const articles = screen.getAllByRole("article");
     articles.forEach((article) => {
       expect(article.className).toContain("min-w-0");
     });
   });
 });
