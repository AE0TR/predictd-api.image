const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const indexRoute = require("./routes/index");
const satRoute = require("./routes/satellites")
const sysRoute = require("./routes/predict")
const ephemRoute = require("./routes/ephemeris")

const { server } = require("./settings");

const app = express();

app.use(cors());
app.use(logger("combined"));

app.use(`/`, indexRoute);
app.use(`/api/${server.version}`, satRoute);
app.use(`/api/${server.version}`, sysRoute);
app.use(`/api/${server.version}`, ephemRoute);

app.listen(server.port, () => {
  console.log(`Listening on port ${server.port}`);
});
