import type { MetadataRoute } from "next";

import { routes, siteConfig } from "@/config/site";
import { SURFACE_THEME_COLOR } from "@/config/viewport";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: routes.home,
    display: "standalone",
    background_color: SURFACE_THEME_COLOR,
    theme_color: SURFACE_THEME_COLOR,
    icons: [
      {
        src: "/icons/lily-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/lily-maskable-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
