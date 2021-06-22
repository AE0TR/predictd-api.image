const express = require("express");
const router = express.Router();
const send = require("./udp")(process.env.PREDICTD_HOST, process.env.PREDICTD_PORT);
const as = require("./as");
const settings = require("./settings");

router.get("/", (req, res) => {
  Promise.all([
    send("GET_QTH"),
    send("GET_VERSION"),
    send("GET_MODE"),
    send("GET_TIME")])
    .then(([qth, version, mode, time]) => res.json({
      qth: as.obj(qth, [
        "callsign",
        "latitude",
        "longitude",
        "altitude",
      ]),
      version:version.trim(),
      mode:mode.trim(),
      time:+time.trim()
    }))
})

router.get("/satellites", (req, res) => {
  send("GET_LIST").then((data) => res.json(as.array(data)));
});

router.get("/satellites/:name", (req, res) => {
  send(`GET_SAT ${req.params.name}`).then((data) =>
    res.json(
      as.obj(data, [
        "name",
        "longitude",
        "latitude",
        "azimuth",
        "elevation",
        "nextEvent",
        "footprint",
        "range",
        "altitude",
        "velocity",
        "orbitNum",
        "visibility",
        "orbitalPhase",
        "eclipse",
        "squint",
      ])
    )
  );
});

router.get("/satellites/:name/doppler", (req, res) => {
  send(`GET_DOPPLER ${req.params.name}`)
    .then((data) => res.json(as.scalar(data)));
});

router.get("/satellites/:name/tle", (req, res) => {
  send(`GET_TLE ${req.params.name}`)
    .then((data) => res.json(data.trim().split("\n"))
    );
});

router.get("/satellites/:name/position", (req, res) => {
  send(`GET_SAT_POS ${req.params.name}`)
    .then((data) => res.json(data.trim().split("\n")));
});

router.get("/satellites/:name/predict/:start", (req, res) => {
  send(`PREDICT ${req.params.name} ${req.params.start}`)
    .then((data) => res.json(data.trim().split("\n")));
});

router.get("/satellites/:name/predict", (req, res) => {
  send(`PREDICT ${req.params.name}`).then((data) =>
    res.json(data.trim().split("\n"))
  );
});

module.exports = router;
