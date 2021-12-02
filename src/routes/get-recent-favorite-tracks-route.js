const express = require("express"),
  router = express.Router(),
  getRecentFavoriteTracks = require("../get-recent-favorite-tracks");

router.get("/", async function (req, res) {
  const data = await getRecentFavoriteTracks(process.env.ACCESS_TOKEN);

  if (data) {
    res.json(data);
  }
});

module.exports = router;
