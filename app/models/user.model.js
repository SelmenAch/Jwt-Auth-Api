const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
    new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    dateOfBirth: Date ,
    gender: String ,
    isActive: Boolean ,
    phoneNumber: Number ,
    sms_notification_active: Boolean ,
    email_notification_active: Boolean ,
    //user_image: File ,
    registration_Date: String

    /*roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]*/
  })
);

module.exports = User;
