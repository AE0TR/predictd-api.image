const express = require("express");
const router = express.Router();
const send = require("../udp")(process.env.PREDICTD_HOST, process.env.PREDICTD_PORT);
const as = require("../as");

router.get("/ephemeris/sun", (req, res) => {
  send("GET_SUN").then((data) =>
    res.json(
      as.obj(data, [
        "azimuth",
        "elevation",
        "declination",
        "hourAngle",
        "rightAscension",
      ])
    )
  );
});

router.get("/ephemeris/moon", (req, res) => {
  send("GET_SUN").then((data) =>
    res.json(
      as.obj(data, [
        "azimuth",
        "elevation",
        "declination",
        "hourAngle",
        "rightAscension",
      ])
    )
  );
});

module.exports = router;
