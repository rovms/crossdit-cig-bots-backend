const express = require("express");
const router = express.Router();

const Robot = require("../../model/robot");

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const robot = new Robot({
      currentLocation: {
        latitude: body.currentLocation.latitude,
        longitude: body.currentLocation.longitude,
      },
      name: body.name,
      energyUsed: body.energyUsed,
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

module.exports = router;
