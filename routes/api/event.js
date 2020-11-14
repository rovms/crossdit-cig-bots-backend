const express = require("express");
const router = express.Router();
const moment = require("moment");

const Event = require("../../model/event");

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newEvent = new Event({
      id: body.id,
      description: body.description,
      date: moment().add(3, "minutes").toDate(),
      location: body.location,
      latlng: body.latlng,
    });
    const saveResult = await newEvent.save();
    return res.status(201).json(saveResult);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("robot");
    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post("/changeDate/:eventId", async (req, res) => {
  console.log("eventId :>> ", req.params.eventId);
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(400).json("Not found.");
    event.date = req.body.date;
    const saveResult = await event.save();
    return res.status(200).json(saveResult);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post("/:eventId", async (req, res) => {
  try {
    let event = await Event.findById(req.params.eventId);
    if (!event) return res.status(400).json("Not found.");
    event.robot = req.body.robotId;
    event = await event.save();
    console.log(event);
    return res.status(200).json(event);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
