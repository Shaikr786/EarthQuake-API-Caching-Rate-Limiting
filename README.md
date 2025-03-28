
# Earthquake API Backend

This project is a **Node.js Express API** that provides earthquake data with **caching**, **rate limiting**, and **load testing** features. The API fetches earthquake details and ensures optimized performance with Redis caching and request limiting.

## 🔗 Live Demo
[View Demo](<https://youtu.be/kuz26pnbvhU>)

## Features
- **Fetch earthquake data** using unique earthquake IDs.
- **Caching** implemented to prevent redundant API calls.
- **Rate limiting** to control excessive requests.
- **Load testing** performed using Artillery.
- **Error handling** for failed requests.

## Live API URL
🚀 [Deployed API](https://earth-quake-api-caching-rate-limiting.vercel.app/)

## Installation & Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/earthquake-api.git
   cd earthquake-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The API will run on `http://localhost:5000`

## API Endpoints
### Fetch All Earthquakes
```http
GET /earthquakes
```
**Response:**
```json
[
  { "id": "us7000k7lf", "magnitude": 6.1, "location": "California" },
  { "id": "us7000jxyz", "magnitude": 5.8, "location": "Japan" }
]
```

### Fetch Earthquake by ID
```http
GET /earthquakes/:id
```
**Example:**
```http
GET /earthquakes/us7000k7lf
```
**Response:**
```json
{
  "id": "us7000k7lf",
  "magnitude": 6.1,
  "location": "California",
  "depth": "10km"
}
```

## Load Testing
We used **Artillery** for load testing. To run tests:
```bash
artillery run load-test.yml
```

## Contributing
Feel free to submit pull requests and contribute to this project.

## License
MIT License

