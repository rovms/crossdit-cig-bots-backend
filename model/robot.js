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

// const part = {
//   part: {
//     type: String,
//   },
//   status: {
//     type: String,
//   },
// };

const part = {
  type: String,
  default: "Ok",
};

const RobotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    installationAt: {
      type: Date,
      default: new Date(),
    },
    position: { type: [Number], default: [55.66071, 12.6024] },
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
    oil: part,
    wheels: part,
    camera: part,
  },
  opts
);

RobotSchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "robot",
  justOne: false,
});

module.exports = mongoose.model("Robot", RobotSchema);
