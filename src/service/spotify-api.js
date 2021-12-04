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

  getTopArtists: async function () {
    const httpRequest = new HttpRequest("GET", ENDPOINTS.USER_TRACKS);

    const response = await httpRequest
      .addHeaders({
        Authorization: `Bearer ${this.getAccessToken()}`,
        "Content-Type": "application/json",
      })
      .execute();

    return response;
  },

  getAddedTracks: function () {
    console.log("get added tracks");
    const data = "top tracks";
    return { data };
  },
};

module.exports = SpotifyApi;
