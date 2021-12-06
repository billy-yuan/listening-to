// Configure dotenv
require("dotenv").config();

// Set up
const express = require("express"),
  app = express(),
  getRecentFavoriteTracks = require("./routes/get-recent-favorite-tracks-route"),
  getTopArtists = require("./routes/get-top-artists-route"),
  authorize = require("./routes/get-new-authorization-code"),
  callback = require("./routes/callback"),
  port = process.env.PORT;

// Add routes
app.use("/get-recent-favorite-tracks", getRecentFavoriteTracks);
app.use("/get-top-artists", getTopArtists);
app.use("/authorize", authorize);
app.use("/callback", callback);

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
