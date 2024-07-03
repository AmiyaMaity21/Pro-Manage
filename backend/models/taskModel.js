const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    assignUser: {
      type: String,
    },
    checklists: [
      {
        text: {
          type: String,
        },
        checked: {
          type: Boolean,
          default: false,
        },
      },
    ],
    dueDate: {
      type: Date,
    },
    createdBy: {
      type: String,
      required: true,
    },
    taskStatus: {
      type: String,
      default: "todo",
    }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Task", taskSchema);
