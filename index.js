require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { ENV_VARS } = require("./assets/enums");

const app = express();

const { PORT, MONGO_SRV } = ENV_VARS;

// enabling parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// check working
app.get("/", (req, res, next) => {
  res.json({ message: "I am working" });
});

// CORS Access
app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,DELETE,PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/", require("./routes/main"));

mongoose
  .connect(MONGO_SRV, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the MongoDb database");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
