const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swagger = require("swagger-ui-express")
const swaggerdoc = require("./swagger.json")

const satRoute = require("./routes/satellites");
const sysRoute = require("./routes/predict");
const ephemRoute = require("./routes/ephemeris");

const server = require("./settings");

const app = express();

app.use('/api-docs', swagger.serve, swagger.setup(swaggerdoc));
app.get("/", (req, res) => res.redirect("/api-docs"));

app.use(cors());
app.use(logger("combined"));

app.use(`/api/${server.version}`, satRoute);
app.use(`/api/${server.version}`, sysRoute);
app.use(`/api/${server.version}`, ephemRoute);

app.listen(server.port, () => {
  console.log(`Listening on port ${server.port}`);
});
