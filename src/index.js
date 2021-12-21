/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
const helmet = require("helmet");
const compression = require("compression");

const routerNavigation = require("./routes");

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(cors());
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.options("*", cors());
app.use(xss());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/", routerNavigation);
app.use("/*", (req, res) => {
  req.statusCode = 404;
  res.send("Path not found");
});

app.listen(port, () => {
  console.log(`Server Express is listen on port ${port}`);
});
