const ENDPOINTS = require("../endpoints");
const HttpRequest = require("./http-request");

function Authorization() {
  this.scope = [];
}

Authorization.prototype = {
  /**
   * Read more about scopes here.
   * https://developer.spotify.com/documentation/general/guides/authorization/scopes/
   * @param {string[]} scope
   */
  addScope: function (scope) {
    this.scope.push(scope);
  },

  // TODO: add refreshAccessToken method

  /**
   *
   * @param {string} authorizationCode
   */
  getAccessToken: async function (authorizationCode) {
    const request = new HttpRequest("POST", ENDPOINTS.TOKEN);
    return request
      .addData({
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: ENDPOINTS.REDIRECT,
      })
      .addHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
      })
      .execute();
  },
};

module.exports = Authorization;
