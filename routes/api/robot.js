const express = require("express");
const { model } = require("../../model/robot");
const router = express.Router()

const Robot = require("../../model/robot");

router.get("/", async (req, res) => {
    res.status(200).json("works")
})

module.exports = router