const ENDPOINTS = require("../endpoints");
const HttpRequest = require("../service/http-request");

function SpotifyApi(credentials) {
  this._credentials = credentials || {};
}

SpotifyApi.prototype = {
  setCredentials: function (credentials) {
    for (let key in credentials) {
      if (credentials.hasOwnProperty(key)) {
        this._credentials[key] = credentials[key];
      }
    }
  },

  getAccessToken: function () {
    return this._credentials.access_token;
  },

  setAccessToken: function (accessToken) {
    this._credentials["access_token"] = accessToken;
  },

  getUserTracks: async function () {
    const httpRequest = new HttpRequest("GET", ENDPOINTS.USER_TRACKS);

    return httpRequest
      .addHeaders({
        Authorization: `Bearer ${this.getAccessToken()}`,
        "Content-Type": "application/json",
      })
      .execute();
  },

  getTopArtists: async function (limit = 16) {
    const httpRequest = new HttpRequest("GET", ENDPOINTS.TOP_ARTISTS);

    return httpRequest
      .addHeaders({
        Authorization: `Bearer ${this.getAccessToken()}`,
        "Content-Type": "application/json",
      })
      .addQueryParams({ limit })
      .execute();
  },
};

module.exports = SpotifyApi;
