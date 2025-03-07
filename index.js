const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const historyFallback = require("connect-history-api-fallback");

const robot = require("./routes/api/robot");
const engineer = require("./routes/api/engineer");
const auth = require("./routes/api/auth");
const event = require("./routes/api/event");

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(historyFallback());

const dbUrl = "mongodb+srv://admin:1rhrTmIHnwhhAnfd@cluster0.jd6dh.mongodb.net/main?retryWrites=true&w=majority";

if (!dbUrl) {
  console.log("DB not configured correctly: ");
}

const port = process.env.PORT || 5000; // Heroku assigns port dynamically.

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/robot", robot);
app.use("/api/engineer", engineer);
app.use("/api/auth", auth);
app.use("/api/event", event);

// function moveRobots() {
//   Robot.find().then((robots) => {
//     robots.forEach((robot) => {
//       console.log(robot.id);
//       console.log("old:" + robot.position[0] + " / " + robot.position[1]);

//       robot.position[0] = rand(robot.position[0]);
//       robot.position[1] = rand(robot.position[1]);

//       console.log("new:" + robot.position[0] + " / " + robot.position[1]);
//       console.log("----------");
//       robot.save();
//     });
//   });
// }

// function rand(n) {
//   const max = n + 0.01;
//   const min = n - 0.01;
//   return Math.random() * (max - min) + min;
// }

// setInterval(() => moveRobots(), 5000);

// setInterval(() => {
//   moveRobots;
// }, 5000);

// moveRobots();

app.listen(port, () => console.log("-------------------------------------\nStarted on port: " + port));
