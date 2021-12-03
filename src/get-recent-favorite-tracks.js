const ENDPOINTS = require("./endpoints");
const axios = require("axios");
const querystring = require("querystring");

/**
 * Send post request to get user's favorite tracks.
 * @param {string} accessToken User's access token frmo the Spotify API or from `refreshAccessToken()`.
 * @returns JSON array of user's favorite tracks.
 */
async function getRecentFavoriteTracks(accessToken) {
  let data = null;

  try {
    const request = await makeApiCall(accessToken);
    data = request.data;
  } catch (error) {
    const errorMessage = error.response.data.error.message;

    if (errorMessage === "The access token expired") {
      const newAccessToken = await refreshAccessToken();
      const request = await makeApiCall(newAccessToken);
      data = request.data;
    }
  }
  return data;
}

/**
 * Make axios call to get user's favorite tracks.
 * @param {string} accessToken
 * @returns Returns axios response.
 */
async function makeApiCall(accessToken) {
  const requestInfo = makeRequestInfo(accessToken);
  return axios(requestInfo);
}

/**
 * Get a new access token.
 * @returns {string} New access token.
 */
async function refreshAccessToken() {
  const formData = {
    refresh_token: process.env.REFRESH_TOKEN,
    grant_type: "refresh_token",
  };

  var authOptions = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify(formData),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
  };

  try {
    const request = await axios(authOptions);
    return request.data.access_token;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Create request info for the GET request for user's added tracks
 * @param {string} accessToken
 * @returns {Object} Object with required info for the GET request for user's added tracks
 */
function makeRequestInfo(accessToken) {
  return {
    method: "GET",
    url: ENDPOINTS.USER_TRACKS,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
}

module.exports = getRecentFavoriteTracks;
