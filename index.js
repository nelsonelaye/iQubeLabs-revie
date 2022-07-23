require("./utils/db");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 2000;

const app = express();
app.use(express.json());
app.get("/api", (req, res) => {
  res.status(200).send("Welcome to Revie");
});

app.use("/api/v1/user", require("./router/user"));
app.use("/api/v1", require("./router/review"));
app.use("/api/v1", require("./router/like"));

app.listen(port, () => {
  console.log("Listening to port: ", port);
});
