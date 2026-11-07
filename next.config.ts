import type { NextConfig } from "next";

// The site is published on GitHub Pages at
// https://tejadah806-netizen.github.io/Porfolio-Website/
// so it's exported as plain static files under that path.
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? "/Porfolio-Website" : "",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
