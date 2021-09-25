const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  appointmentName: {
    type: String,
    required: true,
  },
  personName: {
    type: String,
    required: true,
  },
  appointmentType: {
    type: String,
    required: true,
  },
  dateAndTime: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Tasks", taskSchema);
