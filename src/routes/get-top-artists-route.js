// Configure dotenv
require("dotenv").config();

const express = require("express"),
  router = express.Router(),
  getAccessToken = require("../middleware/getAccessToken"),
  SpotifyAPI = require("../service/spotify-api");

router.get("/", getAccessToken, async (req, res, next) => {
  const spotifyApi = new SpotifyAPI({
    access_token: res.locals.response.access_token,
  });
  const response = await spotifyApi.getTopArtists();
  res.send(response.data);
});

module.exports = router;
