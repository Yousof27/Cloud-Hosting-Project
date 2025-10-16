export const PAGE_LIMIT = 6;

const developmentDomain = "http://localhost:3000";
const productionDomain = "https://cloudhosting01.netlify.app";

export const DOMAIN = process.env.NODE_ENV === "production" ? productionDomain : developmentDomain;
