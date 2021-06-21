const express = require("express");
const router = express.Router();

const send = require("../udp")(process.env.PREDICTD_HOST, process.env.PREDICTD_PORT);
const as = require("../as");

router.get(["/sys", "/sys/qth"], (req, res) => {
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

router.get("/sys/tle", (req, res) => {
  send("RELOAD_TLE").then((data) => res.json("tle reloaded"));
});

router.get("/sys/version", (req, res) => {
  send("GET_VERSION").then((data) => res.json(data.trim()));
});

router.get("/sys/mode", (req, res) => {
  send("GET_MODE").then((data) => res.json(data.trim()));
});

router.get("/sys/time", (req, res) => {
  send("GET_TIME").then((data) => res.json(+data.trim()));
});

module.exports = router;
