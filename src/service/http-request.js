const axios = require("axios");

function HttpRequest(method, url) {
  this.request = {
    method,
    url,
    headers: {},
  };
}

HttpRequest.prototype = {
  setUrl: function (url) {
    this.request.url = url;
    return this;
  },

  addQueryParam: function (param) {
    this.request.endpoint += param;
    return this;
  },

  addHeaders: function (headers) {
    for (let key in headers) {
      if (headers.hasOwnProperty(key)) {
        this.request.headers[key] = headers[key];
      }
    }
    return this;
  },

  execute: async function () {
    return axios(this.request)
      .then((res) => res)
      .catch((e) => e.response.data);
  },
};

module.exports = HttpRequest;