const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Id1:String,
    Id2:String,
    ArrayChat:Array,
    Pin:String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Cht", UserSchema); // collection - users

module.exports = {
  User,
};
