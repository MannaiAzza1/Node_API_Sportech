const express = require("express");
const router = express.Router();
const {
  createSession,
  deleteSession,
  UpdateSession,
  ReadSession,
  ReadSessionByDate,
  ReadAllSession,
  ReadSessionByPeriod,
  FeedbackSession,
  CancelSession,
} = require("../controllers/session.controllers");
const session = require("../controllers/session.controllers");

router.post("/add", createSession);
router.delete("/delete/:_id", deleteSession);
router.put("/:id/update", UpdateSession);
router.put("/:id/cancel", CancelSession);
router.put("/:id/feedback", FeedbackSession);
router.get("/:id", ReadSession);
router.get("/date/today", ReadSessionByDate);
router.get("/get/all", ReadAllSession);
router.post("/get/period", ReadSessionByPeriod);

module.exports = router;
