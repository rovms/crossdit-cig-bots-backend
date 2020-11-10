const express = require("express");
const router = express.Router();

const Engineer = require("../../model/engineer");

router.post("/", async (req, res) => {
  try {
    const newEngineer = new Engineer({
      name: req.body.name,
      password: req.body.password,
    });

    await newEngineer.save();

    return res.status(201).json("Ok.");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const engineers = await Engineer.find();
    return res.status(200).json(engineers);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
