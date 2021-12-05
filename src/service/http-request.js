const axios = require("axios");
const querystring = require("querystring");

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

  addHeaders: function (headers) {
    for (let key in headers) {
      if (headers.hasOwnProperty(key)) {
        this.request.headers[key] = headers[key];
      }
    }
    return this;
  },

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
