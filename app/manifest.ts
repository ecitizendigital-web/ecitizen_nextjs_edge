import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: site.themeColor,
    theme_color: site.themeColor,
    icons: [
      { src: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/assets/ecitizen-avatar-circle-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
