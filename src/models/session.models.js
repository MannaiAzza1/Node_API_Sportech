const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  obj_Is_Achieved: { type: Boolean },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
  date: { type: Date, required: true },
  canceled_reason: { type: String, default: null },
  status: { type: String, enum: ["isGoing", "canceled"], default: "isGoing" },
  feedback: { type: String },
  compToImprove: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competence",
    },
  ],
  statsToAchieve: [
    {
      stat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stat",
      },
      value: String,
    },
  ],
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "programs",
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
});

const Session = mongoose.model("sessions", Schema);

module.exports.createOneSession = (s) => {
  return new Promise(async (resolve, reject) => {
    try {
      let session = await Session.create(s);
      resolve(session);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};
module.exports.deleteOneSession = (id) => {
  return new Promise(async (resolve, reject) => {
    let session = await Session.findByIdAndDelete(id);
  });
};
module.exports.readSession = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let session = await Session.findById(id)
        .populate("place")
        .populate("compToImprove")
        .populate("statsToAchieve")
        .populate("program")
        .populate("player");
      resolve(session);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.readSessionByQuery = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let session = await Session.find(query)
        .populate("place")
        .populate("compToImprove")
        .populate("statsToAchieve")
        .populate("program")
        .populate("player");
      resolve(session);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.readAllSession = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let session = await Session.find()
        .populate("place")
        .populate("compToImprove")
        .populate("statsToAchieve")
        .populate("program")
        .populate("player");
      resolve(session);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.updateSession = (id, s) => {
  return new Promise(async (resolve, reject) => {
    try {
      let session = await Session.updateOne(id, s);
      resolve(session);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.updateFeedbackSession = (id, s) => {
  return new Promise(async (resolve, reject) => {
    try {
      let session = await Session.findByIdAndUpdate(id, s, { new: true });
      resolve(session);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.cancelSession = (id, s) => {
  return new Promise(async (resolve, reject) => {
    try {
      let session = await Session.findByIdAndUpdate(id, s, { new: true });
      resolve(session);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};
