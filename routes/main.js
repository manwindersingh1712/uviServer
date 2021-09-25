const express = require("express");
const taskController = require("../controllers/task");
const router = express.Router();

router.post("/task/add", taskController.postAddTask);

router.get("/task/get", taskController.getTasks);

router.put("/task/complete/:t_id", taskController.putAppointmentComplete);

module.exports = router;
