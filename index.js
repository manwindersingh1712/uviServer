const express = require("express");
const mongoose = require("mongoose");

const app = express();

// enabling parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// check working
app.get("/", (req, res, next) => {
  res.json({ message: "I am working" });
});

// enabling CORS Access
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
  .connect(
    "mongodb+srv://manwinder:9910347671@cluster0.bderr.mongodb.net/my-server?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to the MongoDb database");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
