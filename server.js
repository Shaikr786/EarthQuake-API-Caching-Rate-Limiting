// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const NodeCache = require("node-cache");
// const rateLimit = require("express-rate-limit");
// const cors = require("cors");

// const app = express();
// const cache = new NodeCache({ stdTTL: 60 * 5 }); // Cache for 5 minutes

// // Enable CORS for frontend access
// app.use(cors());

// // Rate Limiting: Max 10 requests per minute per IP
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 10,
//   message: { error: "Too many requests, please try again later." },
// });

// // Apply rate limiting to all routes
// app.use(limiter);

// // Base URL for USGS Earthquake API
// const EARTHQUAKE_API_URL = "https://earthquake.usgs.gov/fdsnws/event/1/query";

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// })

// // GET /earthquakes - Fetch earthquake data with caching
// app.get("/earthquakes", async (req, res) => {
//   const { startTime, endTime } = req.query;
//   const cacheKey = `earthquakes_${startTime}_${endTime}`;

//   // Check cache first
//   if (cache.has(cacheKey)) {
//     return res.json(cache.get(cacheKey));
//   }

//   try {
//     const { data } = await axios.get(EARTHQUAKE_API_URL, {
//       params: {
//         format: "geojson",
//         starttime: startTime,
//         endtime: endTime,
//       },
//     });

//     cache.set(cacheKey, data); // Store in cache
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// });

// app.get("/earthquakes/:id", async (req, res) => {
//   const { id } = req.params;
//   const cacheKey = `earthquake_${id}`;

//   // Check cache
//   if (cache.has(cacheKey)) {
//     console.log("Serving from cache:", id);
//     return res.json(cache.get(cacheKey));
//   }

//   try {
//     // Fetch the earthquake details directly using its ID
//     const response = await axios.get(EARTHQUAKE_API_URL, {
//       params: { eventid: id, format: "geojson" }, // Direct ID search
//     });

//     if (!response.data || response.data.type !== "Feature") {
//       return res.status(404).json({ error: "Earthquake not found" });
//     }

//     // Store in cache
//     cache.set(cacheKey, response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching earthquake details:", error.message);
//     res.status(500).json({ error: "Failed to fetch earthquake details", details: error.message });
//   }
// });

  
// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const earthquakeRoutes = require("./routes/earthquakeRoute");

const app = express();

// Enable CORS
app.use(cors());

// Earthquake API Routes
app.use("/earthquakes", earthquakeRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Earthquake API is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
