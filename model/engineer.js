var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const opts = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
};

const EngineerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  opts
);

module.exports = mongoose.model("Engineer", EngineerSchema);
