const axios = require("axios");
const querystring = require("querystring");

/**
 *
 * @param {string} method Http request type (note: GET or POST are currently supported )
 * @param {string} url url of the request
 */
function HttpRequest(method, url) {
  this.request = {
    method,
    url: new URL(url),
    headers: {},
  };
  this.queryParams = {};
}

HttpRequest.prototype = {
  setUrl: function (url) {
    this.request.url = new URL(url);
    return this;
  },

  /**
   *
   * @param {Object.<string,string>} queryParams key-value pairs of query parameters and values.
   */
  addQueryParams: function (queryParams) {
    for (let key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        this.queryParams[key] = queryParams[key];
        this.request.url.searchParams.append(key, queryParams[key]);
      }
    }
    return this;
  },

  /**
   * Get url string by putting together query params and the request URL.
   */
  getUrl: function () {
    return this.request.url + querystring.stringify(this.queryParams);
  },

  /**
   * @param {Object<string,string>} headers
   * @returns
   */
  addHeaders: function (headers) {
    for (let key in headers) {
      if (headers.hasOwnProperty(key)) {
        this.request.headers[key] = headers[key];
      }
    }
    return this;
  },

  /**
   * Adds body parameters.
   * @param {Object<string,string>} data key-value pairs for the body parameters of the request.
   * @returns
   */
  addData: function (data) {
    this.request.data = querystring.stringify(data);
    return this;
  },

  execute: async function () {
    const request = { ...this.request, url: this.request.url.href };
    return axios(request)
      .then((res) => res)
      .catch((e) => e.response);
  },
};

module.exports = HttpRequest;
