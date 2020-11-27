const express = require("express");
const router = express.Router();

const { endpoint } = require("../settings");
const udp = require("../udp");

router.get("/ephemeris/sun", (req, res) => {
  udp(endpoint.host, endpoint.port, "GET_SUN").then((data) =>
    res.json(data.trim().split("\n"))
  );
});

router.get("/ephemeris/moon", (req, res) => {
  udp(endpoint.host, endpoint.port, "GET_SUN").then((data) =>
    res.json(data.trim().split("\n"))
  );
});

module.exports = router;