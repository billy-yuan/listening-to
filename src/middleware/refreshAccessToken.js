const ENDPOINTS = require("../endpoints");
const HttpRequest = require("../service/http-request");

const header = {
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization:
    "Basic " +
    Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    ).toString("base64"),
};

const data = {
  refresh_token: process.env.REFRESH_TOKEN,
  grant_type: "refresh_token",
};

async function refreshAccessToken(req, res, next) {
  const httpRequest = new HttpRequest("POST", ENDPOINTS.TOKEN);
  const response = await httpRequest.addHeaders(header).addData(data).execute();
  res.locals.response = response.data;
  next();
}

module.exports = refreshAccessToken;
