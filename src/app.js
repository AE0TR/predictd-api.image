const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swagger = require("swagger-ui-express")
const swaggerdoc = require("./swagger.json")

const routes = require("./routes");

const server = require("./settings");

const app = express();

app.use('/api-docs', swagger.serve, swagger.setup(swaggerdoc));

app.use(cors());
app.options('*', cors());
app.use(logger("combined"));

app.use(`/api/${server.version}`, routes);

app.listen(server.port, () => {
  console.log(`Listening on port ${server.port}`);
});
