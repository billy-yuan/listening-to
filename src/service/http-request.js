const axios = require("axios");
const querystring = require("querystring");

function HttpRequest(method, url) {
  this.request = {
    method,
    url,
    headers: {},
  };
  this.queryParams = {};
}

HttpRequest.prototype = {
  setUrl: function (url) {
    this.request.url = url;
    return this;
  },

  /**
   *
   * @param {object} queryParams key-value pairs of query parameters and values.
   */
  addQueryParams: function (queryParams) {
    for (let key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        this.queryParams[key] = queryParams[key];
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
   * @param {object} headers
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
   * @param {object} data key-value pairs for the body parameters of the request.
   * @returns
   */
  addData: function (data) {
    this.request.data = querystring.stringify(data);
    return this;
  },

  execute: async function () {
    return axios(this.request)
      .then((res) => res)
      .catch((e) => e.response);
  },
};

module.exports = HttpRequest;
