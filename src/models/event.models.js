const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coach",
    required: false,
  },
  isPublic: { type: String, required: true },
  details: { type: String, required: true },
  interested: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  participated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  notParticipated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
});

const Event = mongoose.model("events", Schema);

module.exports.createOneEvent = (ev) => {
  return new Promise(async (resolve, reject) => {
    try {
      let event = await Event.create(ev);
      resolve(event);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.readEvent = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let event = await Event.findById(id).populate([
        "participated",
        "interested",
        "Coach",
      ]);
      resolve(event);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.readAllEvent = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let event = await Event.find().populate([
        "participated",
        "interested",
        "Coach",
      ]);
      resolve(event);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.updateEvent = (id, p) => {
  return new Promise(async (resolve, reject) => {
    try {
      let event = await Event.updateOne(id, p).populate([
        "participated",
        "interested",
        "Coach",
      ]);
      resolve(event);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.deleteEvent = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let event = await Event.findByIdAndDelete(id).populate([
        "participated",
        "interested",
      ]);
      resolve(event);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.deleteAllEvent = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let event = await Event.deleteMany().populate([
        "participated",
        "interested",
      ]);
      resolve(event);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.readPublicEvent = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let event = await Event.find(query).populate([
        "participated",
        "interested",
      ]);
      resolve(event);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};
