import NodeCache from 'node-cache';

// Create a cache instance with no default TTL
const cache = new NodeCache({ stdTTL: 0, checkperiod: 600 });

export default cache;