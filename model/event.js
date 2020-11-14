var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const opts = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
};

const EventSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
    },
    location: {
      type: String,
    },
    latlng: {
      type: [Number],
    },
    robot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Robot",
    },
  },
  opts
);

module.exports = mongoose.model("Event", EventSchema);
