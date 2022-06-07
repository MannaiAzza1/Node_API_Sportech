const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  Desc: { type: String, required: true },
  image: { type: String, required: true },
  vid_link: { type: String, required: true },
  competence: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "competence",
    },
  ],
});

const Program = mongoose.model("programs", Schema);

module.exports.createOneProgram = (p) => {
  return new Promise(async (resolve, reject) => {
    try {
      let program = await Program.create(p);
      resolve(program);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.readProgram = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let program = await Program.findById(id);
      resolve(program);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.readAllProgram = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let program = await Program.find();
      resolve(program);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.updateProgram = (id, p) => {
  return new Promise(async (resolve, reject) => {
    try {
      let program = await Program.updateOne(id, p);
      resolve(program);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.deleteProgram = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let program = await Program.findByIdAndDelete(id);
      resolve(program);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};

module.exports.deleteAllProgram = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let program = await Program.deleteMany();
      resolve(program);
    } catch (err) {
      reject({ message: err.message });
    }
  });
};
