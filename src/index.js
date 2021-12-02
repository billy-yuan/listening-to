// Configure dotenv
require("dotenv").config();

// Set up
const express = require("express"),
  app = express(),
  getRecentFavoriteTracks = require("./routes/get-recent-favorite-tracks-route"),
  port = process.env.PORT;

// Add routes
app.use("/get-recent-favorite-tracks", getRecentFavoriteTracks);

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
