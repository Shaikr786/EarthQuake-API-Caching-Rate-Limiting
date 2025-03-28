const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 * 5 }); // Cache data for 5 minutes

module.exports = cache;
