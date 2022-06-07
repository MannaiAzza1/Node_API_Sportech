const express = require("express");
const router = express.Router();
const {
  createEvent,
  readEvent,
  readAllEvent,
  updateEvent,
  deleteEvent,
  deleteAllEvent,
  readPublicEvent,
  addParticipatedPlayer,
} = require("../controllers/event.controllers");

router.post("/add", createEvent);
router.get("/get/:_id", readEvent);
router.get("/get", readAllEvent);
router.put("/update/:_id", updateEvent);
router.delete("/delete/:_id", deleteEvent);
router.delete("/delete", deleteAllEvent);
router.get("/public/:id", readPublicEvent);
router.post("/participated", addParticipatedPlayer);

module.exports = router;
