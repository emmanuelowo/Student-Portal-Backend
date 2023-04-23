const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
require("dotenv").config();
const errorHandler = require("./middleware/error-handler");
const errorMessage = require("./middleware/error-message");
const accessControls = require("./middleware/access-controls");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const qNARoutes = require("./routes/qNA.routes");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json()); // to support JSON-encoded bodies

// Requiring Routes

const UsersRoutes = require("./routes/users.routes");
const VideosRoutes = require("./routes/videos.routes");

// connection to mongoose
const mongoCon = process.env.mongoCon;

mongoose
  .connect(mongoCon, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.error("database connection failed", err));

const fs = require("fs");
fs.readdirSync(__dirname + "/models").forEach(function (file) {
  require(__dirname + "/models/" + file);
});

// in case you want to serve images

app.get("/", function (req, res) {
  res.status(200).send({
    message: "Express backend server",
  });
});

app.set("port", 3000);

app.use("/public", express.static("public"));
app.use(accessControls);
app.use(cors());

// Routes which should handle requests
app.use("/auth", UsersRoutes);
app.use("/video", VideosRoutes);
app.use("/qna", qNARoutes);

app.use(errorHandler);

app.use(errorMessage);

server.listen(app.get("port"));
console.log("listening on port", app.get("port"));
