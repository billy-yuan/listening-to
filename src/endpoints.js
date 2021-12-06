require("dotenv").config();

const ENDPOINTS = {
  USER_TRACKS: "https://api.spotify.com/v1/me/tracks",
  TOP_ARTISTS: " https://api.spotify.com/v1/me/top/artists",
  TOKEN: "https://accounts.spotify.com/api/token",
  AUTHORIZE: "https://accounts.spotify.com/authorize?",
  REDIRECT: `http://localhost:${process.env.PORT}/callback/`,
};

module.exports = ENDPOINTS;
