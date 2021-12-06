/**
 * This route is used when the user is logging in for the first time
 * or needs to change authorization scopes.
 *
 * More on authorization scopes:
 * https://developer.spotify.com/documentation/general/guides/authorization/scopes/
 */

require("dotenv").config();

const ENDPOINTS = require("../endpoints");
const HttpRequest = require("../service/http-request");

const express = require("express"),
  router = express.Router();

router.get("/", (req, res) => {
  const request = new HttpRequest("GET", ENDPOINTS.AUTHORIZE);
  const url = request
    .addQueryParams({
      response_type: "code",
      client_id: process.env.CLIENT_ID,
      scope: ["user-top-read", "user-library-read"],
      redirect_uri: ENDPOINTS.REDIRECT,
    })
    .getUrl();

  res.redirect(url);
});

module.exports = router;
