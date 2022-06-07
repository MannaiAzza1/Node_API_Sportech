const {
  createOneProgram,
  readProgram,
  readAllProgram,
  updateProgram,
  deleteProgram,
  deleteAllProgram,
} = require("../models/program.models");

module.exports.createProgram = async (req, res) => {
  try {
    let p = req.body;
    let program = await createOneProgram(p);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: program,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: err.message,
    });
  }
};

module.exports.readProgram = async (req, res) => {
  try {
    let id = req.params;
    let program = await readProgram(id);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: program,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};

module.exports.readAllProgram = async (req, res) => {
  try {
    let program = await readAllProgram(req.body);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: program,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};

module.exports.updateProgram = async (req, res) => {
  try {
    let id = req.params;
    let p = req.body;
    let program = await updateProgram(id, p);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: program,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};

module.exports.deleteProgram = async (req, res) => {
  try {
    let id = req.params;
    let program = await deleteProgram(id);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: program,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};

module.exports.deleteAllProgram = async (req, res) => {
  try {
    let id = req.params;
    let program = await deleteAllProgram();
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: program,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};
