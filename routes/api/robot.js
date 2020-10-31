const express = require("express");
const router = express.Router();

const Robot = require("../../model/robot");

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const cigs = [];
    let i;
    for (i = 1; i < 6; i++) {
      cigs.push({
        position: {
          lat: body.position.lat + 0.001 * i,
          lng: body.position.lng - 0.0005 * i,
        },
        date: new Date(),
      });
    }
    const robot = new Robot({
      position: {
        lat: body.position.lat,
        lng: body.position.lng,
      },
      name: body.name,
      energyUsed: body.energyUsed,
      cigsCollected: cigs,
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
    const robots = await Robot.find();
    return res.status(200).json(robots);
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
