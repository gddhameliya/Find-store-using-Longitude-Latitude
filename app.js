require("dotenv").config();
const connection = require("./db/connection");
const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes/index.routes");

app.use(
  cors({
    origin: "*",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Welcome to poll Api!");
});

app.use("/api/v1", routes);

connection();

let port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`App listening on port ${port}...`));

module.exports = app;
