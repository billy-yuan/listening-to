// Configure dotenv
require("dotenv").config();

const express = require("express"),
  router = express.Router(),
  SpotifyAPI = require("../service/spotify-api");

router.get("/", async (req, res, next) => {
  const spotifyApi = new SpotifyAPI({ access_token: process.env.ACCESS_TOKEN });
  const data = await spotifyApi.getTopArtists();
  res.send(data);
});

module.exports = router;
