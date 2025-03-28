const axios = require("axios");
const cache = require("../config/cache");

const EARTHQUAKE_API_URL = "https://earthquake.usgs.gov/fdsnws/event/1/query";

// Fetch Earthquakes with optional date range
exports.getEarthquakes = async (req, res) => {
  const { startTime, endTime } = req.query;
  const cacheKey = `earthquakes_${startTime}_${endTime}`;

  // Check cache
  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  try {
    const { data } = await axios.get(EARTHQUAKE_API_URL, {
      params: { format: "geojson", starttime: startTime, endtime: endTime },
    });

    cache.set(cacheKey, data); // Store response in cache
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch earthquake data" });
  }
};

// Fetch Earthquake by ID
exports.getEarthquakeById = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `earthquake_${id}`;

  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  try {
    const response = await axios.get(EARTHQUAKE_API_URL, {
      params: { eventid: id, format: "geojson" },
    });

    if (!response.data || response.data.type !== "Feature") {
      return res.status(404).json({ error: "Earthquake not found" });
    }

    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching earthquake details:", error.message);
    res.status(500).json({ error: "Failed to fetch earthquake details" });
  }
};
