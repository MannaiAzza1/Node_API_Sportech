const {
  createOneEvent,
  readEvent,
  readAllEvent,
  updateEvent,
  deleteEvent,
  deleteAllEvent,
  readPublicEvent,
} = require("../models/event.models");
const readPlayer = require("../models/player.model");
module.exports.createEvent = async (req, res) => {
  try {
    let e = req.body;
    let event = await createOneEvent(e);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: event,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: err.message,
    });
  }
};

module.exports.readEvent = async (req, res) => {
  try {
    let id = req.params;
    let event = await readEvent(id);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: event,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};

module.exports.readAllEvent = async (req, res) => {
  try {
    let event = await readAllEvent();
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: event,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};

module.exports.updateEvent = async (req, res) => {
  try {
    let id = req.params;
    let ev = req.body;
    let event = await updateEvent(id, ev);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: event,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};

module.exports.deleteEvent = async (req, res) => {
  try {
    let id = req.params;
    let event = await deleteEvent(id);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: event,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};

module.exports.deleteAllEvent = async (req, res) => {
  try {
    let id = req.params;
    let event = await deleteAllEvent();
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: event,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};

module.exports.readPublicEvent = async (req, res) => {
  try {
    let query = {
      isPublic: true,
      coach: req.params.id,
    };
    let event = await readPublicEvent(query);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: event,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};

module.exports.addParticipatedPlayer = async (req, res) => {
  try {
    let { playerId, eventId, action } = req.body;
    let event = await readEvent(eventId);
    let player = await readPlayer(playerId);
    if (action == "participated") {
      event.participated.push(player);
    } else if (action == "interested") {
      event.interested.push(player);
    } else if (action == "notParticipated") {
      event.notParticipated.push(player);
    }
    event.save();
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: event,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};
