const express = require("express");
const routinesRouter = express.Router();

const {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  updateRoutines,
  getRoutineByRoutineName,
} = require("../db/adapters");
