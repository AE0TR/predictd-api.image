const express = require("express");
const router = express.Router();

const send = require("../udp")(
  process.env.PREDICTD_HOST || "localhost",
  process.env.PREDICTD_PORT || 1210
);
const as = require("../as");

router.get(["/predict", "/predict/qth"], (req, res) => {
  send("GET_QTH").then((data) => {
    const info = as.obj(data, [
      "callsign",
      "latitude",
      "longitude",
      "altitude",
    ]);
    info.longitude *= -1; // predict uses positive is west
    res.json(info);
  });
});

router.get("/predict/version", (req, res) => {
  send("GET_VERSION").then((data) => res.json(data.trim()));
});

router.get("/predict/mode", (req, res) => {
  send("GET_MODE").then((data) => res.json(data.trim()));
});

router.get("/predict/time", (req, res) => {
  send("GET_TIME").then((data) => res.json(+data.trim()));
});

router.get("/predict/tle", (req, res) => {
  send("RELOAD_TLE").then((data) => res.json("tle reloaded"));
});

module.exports = router;
