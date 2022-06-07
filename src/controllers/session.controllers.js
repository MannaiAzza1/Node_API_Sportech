const {
  createOneSession,
  updateSession,
  readSession,
  deleteOneSession,
  readSessionByQuery,
  readAllSession,
  updateFeedbackSession,
  cancelSession,
} = require("../models/session.models");

module.exports.createSession = async (req, res) => {
  try {
    let s = req.body;
    let session = await createOneSession(s);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: session,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: err.message,
    });
  }
};
module.exports.ReadSession = async (req, res) => {
  try {
    let id = req.params.id;
    let session = await readSession(id);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: session,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};
module.exports.ReadSessionByPeriod = async (req, res) => {
  try {
    let { firstDay, secondDay } = req.body;
    let query = {
      date: {
        $gte: new Date(firstDay),
        $lt: new Date(secondDay),
      },
    };
    let program = await readSessionByQuery(query);
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
module.exports.ReadSessionByDate = async (req, res) => {
  try {
    var today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    let query = {
      date: {
        $lt: today.toISOString(),
      },
    };
    console.log(query);
    let program = await readSessionByQuery(query);
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
module.exports.ReadAllSession = async (req, res) => {
  try {
    let program = await readAllSession();
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
module.exports.deleteSession = async (req, res) => {
  let id = req.params;
  let session = await deleteOneSession(id);
};

module.exports.UpdateSession = async (req, res) => {
  try {
    let id = req.params;
    let ev = req.body;
    let event = await updateSession(id, ev);
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

module.exports.FeedbackSession = async (req, res) => {
  try {
    let id = req.params.id;
    let session = {
      feedback: req.body.feedback,
      obj_Is_Achieved: req.body.obj_Is_Achieved,
    };
    const seance = await updateFeedbackSession(id, session);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: seance,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};

module.exports.CancelSession = async (req, res) => {
  try {
    let id = req.params.id;
    let session = {
      status: req.body.status,
      canceled_reason: req.body.canceled_reason,
    };
    const seance = await cancelSession(id, session);
    return res.status(200).json({
      status: "success",
      errorCode: 0,
      data: seance,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      errorCode: 400,
      data: error.message,
    });
  }
};
