const express = require("express");
const router = express.Router();

const udp = require("../udp");
const as = require("../as");

const { endpoint } = require("../settings");

router.get("/ephemeris/sun", (req, res) => {
  udp(endpoint.host, endpoint.port, "GET_SUN").then((data) =>
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
  udp(endpoint.host, endpoint.port, "GET_SUN").then((data) =>
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
