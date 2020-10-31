var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const opts = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
};

const position = {
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
};

const cigCollected = {
  date: {
    type: Date,
    required: true,
  },
  position: {
    type: position,
  },
};

const RobotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: { type: position },
    targetLocation: { type: position },
    energyUsed: {
      type: Number,
      default: 0,
    },
    cigsCollected: {
      type: [cigCollected],
      default: [],
    },
    batteryLevel: {
      type: Number,
      min: 0,
      max: 5,
      default: 5,
    },
  },
  opts
);

module.exports = mongoose.model("Robot", RobotSchema);
