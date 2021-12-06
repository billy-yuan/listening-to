// Configure dotenv
require("dotenv").config();

const express = require("express"),
  router = express.Router(),
  refreshAccessToken = require("../middleware/refreshAccessToken"),
  SpotifyAPI = require("../service/spotify-api");

router.get("/", refreshAccessToken, async (req, res, next) => {
  const spotifyApi = new SpotifyAPI({
    access_token: res.locals.response.access_token,
  });
  const response = await spotifyApi.getTopArtists();
  res.send(response.data);
});

module.exports = router;
