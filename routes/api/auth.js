const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Engineer = require("../../model/engineer");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  Engineer.findOne({
    name: req.body.name,
  })
    .then((engineer) => {
      if (!engineer) {
        console.log("User not found. name=" + req.body.name);
        return res.status(403).send({ message: "User Not found." });
      }
      bcrypt.compare(req.body.password, engineer.password).then((result) => {
        if (!result) {
          console.log("Wrong user credentials (email=" + req.body.name + ",password=" + req.body.password + ")");
          return res.status(401).json({
            message: "Login failed",
          });
        }

        let token = jwt.sign({ id: engineer.id }, process.env.JWT_PW_SECRET, {
          expiresIn: 20000,
        });

        res.status(200).send({
          token: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
