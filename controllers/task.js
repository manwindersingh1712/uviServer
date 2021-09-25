const Task = require("../models/task");
const moment = require("moment");

exports.postAddTask = (req, res, next) => {
  const { appointmentName, personName, appointmentType, date, time } = req.body;

  const dateAndTime = moment(time).set({ date: moment(date).get("date") });

  const task = new Task({
    appointmentName,
    personName,
    appointmentType,
    dateAndTime,
  });

  task
    .save()
    .then(() => {
      res.status(201).json({ message: "Added a class to the database" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTasks = (req, res, next) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json({ tasks, message: "we got all tasks" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.putAppointmentComplete = (req, res, next) => {
  const { t_id } = req.params;

  Task.findOne({ _id: t_id })
    .then((task) => {
      task.completed = true;
      return task.save();
    })
    .then(() => {
      res.status(202).json({ message: "Updated successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};
