var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const opts = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
};

const location = {
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
}

const RobotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    currentLocation: {type: location},
    targetLocation: {type: location},
    energyUsed: {
        type: Number,   
    }
  },
  opts
);

module.exports = mongoose.model("Robot", RobotSchema);