const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const historyFallback = require("connect-history-api-fallback");


// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(historyFallback());

const dbUrl = "mongodb+srv://admin:1rhrTmIHnwhhAnfd@cluster0.jd6dh.mongodb.net/<dbname>?retryWrites=true&w=majority"

if (!dbUrl) {
  console.log("DB not configured correctly: ");
}

const port = process.env.PORT || 5000; // Heroku assigns port dynamically.

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.listen(port, () =>
  console.log("-------------------------------------\nStarted on port: " + port)
);