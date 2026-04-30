import NodeCache from "node-cache";

// stdTTL: The standard time-to-live in seconds (e.g., 86400 = 24 hours)
// checkperiod: How often the cache checks for expired items to delete them
const appCache = new NodeCache({ stdTTL: 86400, checkperiod: 600 });

export default appCache;