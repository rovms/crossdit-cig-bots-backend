const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/check-auth");

const Robot = require("../../model/robot");

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const cigs = [];
    let i;
    for (i = 1; i < 6; i++) {
      cigs.push({
        position: [body.position.lat * 0.001 * i, body.position.lng - 0.0005 * i],
        date: new Date(),
      });
    }
    const robot = new Robot({
      position: [body.position.lat, body.position.lng],
      name: body.name,
      energyUsed: body.energyUsed,
      cigsCollected: [],
      id: body.id,
      batteryLevel: Math.round(Math.random() * 100),
      trashLevel: Math.round(Math.random() * 100),
      oil: body.oil,
      wheels: body.wheels,
      camera: body.camera,
    });
    await robot.save();
    return res.status(201).send("Created.");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const robots = await Robot.find().populate("engineer").populate("events");
    return res.status(200).json(robots);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post("/pickup", async (req, res) => {
  console.log(req.body);
  try {
    const robot = await Robot.findById(req.body.robotId);
    if (!robot) return res.status(400).json("Not found.");
    robot.status = "Pick up";
    robot.engineer = req.body.engineerId;
    const saved = await robot.save();
    console.log(saved);
    return res.status(200).json("Ok");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get("/:robotId", async (req, res) => {
  try {
    const robot = await Robot.findById(req.params.robotId);
    if (!robot) return res.status(400).json("Not found.");
    return res.status(200).json(robot);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
