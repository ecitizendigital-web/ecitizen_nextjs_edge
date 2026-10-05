/** True only on the production deployment. Preview and local builds are kept out of search engines. */
export const isProductionSite: boolean = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";
