require("dotenv").config();

const ENDPOINTS = require("../endpoints");
const refreshAccessToken = require("../middleware/refreshAccessToken");
const SpotifyApi = require("../service/spotify-api");

const express = require("express"),
  router = express.Router();

router.get("/", refreshAccessToken, async function (req, res) {
  const spotifyApi = new SpotifyApi({
    access_token: res.locals.response.access_token,
  });

  const response = await spotifyApi.getUserTracks();

  return res.send(response.data);
});

module.exports = router;
