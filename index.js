require("./utils/db");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 2000;

const app = express();
app.use(express.json());
app.get("/api/v1", (req, res) => {
  res.send("Welcome to Revie");
});

app.use("/api/v1/user", require("./router/user"));

app.listen(port, () => {
  console.log("Listening to port: ", port);
});
