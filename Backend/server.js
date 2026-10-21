const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const placesRoutes = require("./routes/placesRoutes");
const planRoutes = require("./routes/planRoutes");
const costRoutes = require("./routes/costRoutes");
const restaurantCostRoutes =
  require("./routes/restaurantCostRoutes");

dotenv.config();

const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// Database

connectDB();


// Routes

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/destinations",
  destinationRoutes
);

app.use("/api/weather", weatherRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/plan", planRoutes);
app.use(
  "/api/costs",
  costRoutes
);
app.use(
  "/api/restaurant-cost",
  restaurantCostRoutes
);


// Test route

app.get("/", (req, res) => {
  res.json({
    message:
      "TravelMate backend is running",
  });
});


// Server

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
