/**
 * This callback will get a new access token after a user goes through
 * the get-new-authorization-code route. Note: this is not the same as
 * refreshing the access. See middleware/refreshAccessToken.js for
 * refreshing a token)
 * The response is a json with the access token and refresh token.
 * Put both codes in your .env file.
 */

const Authorization = require("../service/authorization");

const express = require("express"),
  router = express.Router();

router.get("/", async (req, res) => {
  // Get authorization code after the user successfully logs in
  const authorizationCode = res.req.originalUrl
    .split("/callback/?code=")
    .join("");

  // Get the new access code
  const authorization = new Authorization();
  const response = await authorization.getAccessToken(authorizationCode);

  res.send(response.data);
});

module.exports = router;
