const mongoose = require("mongoose");
const Place = mongoose.model(
  "Place",
  new mongoose.Schema({
    name: { type: String, default: null, required: true },
    town: { type: String, required: true },
    country: { type: String },
    address: { type: String },
   
    
   session: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session"
      }
    ]
    

  })
);
module.exports = Place;
