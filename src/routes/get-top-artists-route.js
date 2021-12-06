// Configure dotenv
require("dotenv").config();

const FormatResponse = require("../service/format-response");

const express = require("express"),
  router = express.Router(),
  refreshAccessToken = require("../middleware/refreshAccessToken"),
  SpotifyAPI = require("../service/spotify-api");

router.get("/", refreshAccessToken, async (req, res, next) => {
  const spotifyApi = new SpotifyAPI({
    access_token: res.locals.response.access_token,
  });
  const response = await spotifyApi.getTopArtists();
  const formattedResponse = FormatResponse.formatTopArtists(
    response.data.items
  );
  res.send(formattedResponse);
});

module.exports = router;
