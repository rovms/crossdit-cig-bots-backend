var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const opts = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
};

const cigCollected = {
  date: {
    type: Date,
    required: true,
  },
  position: {
    type: [Number],
    default: [55.66071, 12.6024],
  },
};

const RobotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    installationAt: {
      type: Date,
      default: new Date(),
    },
    position: { type: [Number], default: [55.66071, 12.6024] },
    targetLocation: { type: [Number], default: [] },
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
      max: 100,
      default: 100,
    },
    trashLevel: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Pick up", "Error"],
      default: "Active",
    },
    engineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Engineer",
    },
  },
  opts
);

module.exports = mongoose.model("Robot", RobotSchema);
