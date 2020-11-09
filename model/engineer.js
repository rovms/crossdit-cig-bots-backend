var mongoose = require("mongoose");
const SALT_WORK_FACTOR = 10;
var bcrypt = require("bcrypt");

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
    password: {
      type: String,
      required: true,
    },
  },
  opts
);
EngineerSchema.pre("save", function (next) {
  let engineer = this;

  if (!engineer.isNew) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(engineer.password, salt, function (err, hash) {
      if (err) return next(err);

      engineer.password = hash;
      next();
    });
  });
});

EngineerSchema.methods.comparePassword = function (inputPw, cb) {
  bcrypt.compare(inputPw, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

EngineerSchema.methods.toJSON = function () {
  var engineer = this.toObject();
  delete engineer.password;
  return engineer;
};

module.exports = mongoose.model("Engineer", EngineerSchema);
