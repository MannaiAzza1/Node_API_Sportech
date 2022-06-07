const express = require("express");
const router = express.Router();
const {
  createProgram,
  readProgram,
  readAllProgram,
  updateProgram,
  deleteProgram,
  deleteAllProgram,
} = require("../controllers/program.controllers");

router.post("/add", createProgram);
router.get("/get/:_id", readProgram);
router.get("/get", readAllProgram);
router.put("/update/:_id", updateProgram);
router.delete("/delete/:_id", deleteProgram);
router.delete("/delete", deleteAllProgram);

module.exports = router;
