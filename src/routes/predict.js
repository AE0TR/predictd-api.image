const express = require("express");
const router = express.Router();

const { endpoint } = require("../settings");
const udp = require("../udp");
const as = require("../as");

router.get(["/predict", "/predict/qth"], (req, res) => {
  udp(endpoint.host, endpoint.port, "GET_QTH").then((data) =>
    res.json(as.obj(data, ["callsign", "latitude", "longitude", "altitude"]))
  );
});

router.get("/predict/version", (req, res) => {
  udp(endpoint.host, endpoint.port, "GET_VERSION").then((data) =>
    res.json(data.trim())
  );
});

router.get("/predict/mode", (req, res) => {
  udp(endpoint.host, endpoint.port, "GET_MODE").then((data) =>
    res.json(data.trim())
  );
});

router.get("/predict/time", (req, res) => {
  udp(endpoint.host, endpoint.port, "GET_TIME").then((data) =>
    res.json(+data.trim())
  );
});

router.get("/predict/tle", (req, res) => {
  udp(endpoint.host, endpoint.port, "RELOAD_TLE").then((data) =>
    res.json("tle reloaded")
  );
});

module.exports = router;
