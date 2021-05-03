const mongoose = require("mongoose");

const Test = mongoose.model(
    "Test",
    new mongoose.Schema({
        type: String,
        questions: [] ,
        options: [] 
    })
  );
  
  module.exports = Test;