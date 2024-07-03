const Task = require("../models/taskModel");
const User = require("../models/userModel");

// Create a new task
const createTask = async (req, res, next) => {
  try {
    const { title, priority, assignUser, checklists, dueDate } = req.body;
    if (!title || !priority || checklists.length === 0) {
      return res
        .status(400)
        .json({ errorMessage: "Please fill all the required fields" });
    }
    let formattedDueDate;
    if (dueDate) {
      const [day, month, year] = dueDate.split("/");
      formattedDueDate = new Date(`${year}-${month}-${day}`);
    }
    const taskData = {
      title: title.trim(),
      priority: priority,
      assignUser: assignUser,
      checklists: checklists,
      dueDate: formattedDueDate,
      createdBy: req.user.id,
    };
    const task = new Task(taskData);
    await task.save();
    res.status(201).json({ success: true, task, taskId: task.id });
  } catch (error) {
    next(error);
  }
};

// Get all user tasks
const getAllTasks = async (req, res, next) => {
  try {
    const { filterByDate } = req.query;
    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const dateRanges = {
      today: { createdAt: { $gte: startOfDay, $lte: endOfDay } },
      week: { createdAt: { $gte: startOfWeek, $lte: endOfWeek } },
      month: { createdAt: { $gte: startOfMonth, $lte: endOfMonth } },
    };

    const dateRange = filterByDate ? dateRanges[filterByDate] : {};

    // const tasks = await Task.find({ createdBy: req.user.id, ...dateRange });
    const tasks = await Task.find({
      $or: [{ createdBy: req.user.id }, { assignUser: req.user.email }],
      ...dateRange,
    });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
};

// Get a quiz details
const getTaskDetailsById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ errorMessage: "Task not found" });
    }
    return res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

// Update a task
const updateTaskDetailsById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ errorMessage: "Task not found" });
    }

    const isCreator = task.createdBy.toString() === req.user.id;
    const isAssignedUser = task.assignUser === req.user.email;

    if (!isCreator && !isAssignedUser) {
      return res.status(403).json({ errorMessage: "Unauthorized action" });
    }

    const { title, priority, assignUser, checklists, dueDate, taskStatus } =
      req.body;
    let taskData = {};

    if (isCreator) {
      if (taskStatus) taskData.taskStatus = taskStatus;
      if (checklists) taskData.checklists = checklists;
      if (title) taskData.title = title.trim();
      if (priority) taskData.priority = priority;
      if (assignUser) taskData.assignUser = assignUser;

      if (
        (title || priority) &&
        (!title || !priority || (checklists && checklists.length === 0))
      ) {
        return res
          .status(400)
          .json({ errorMessage: "Please fill all the required fields" });
      }

      if (dueDate) {
        const [day, month, year] = dueDate.split("/");
        taskData.dueDate = new Date(`${year}-${month}-${day}`);
      }
    } else if (isAssignedUser) {
      if (checklists) {
        taskData.checklists = checklists;
      } else {
        return res
          .status(400)
          .json({ errorMessage: "Unauthorized action" });
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      taskData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({ success: true, task: updatedTask, taskId: task.id });
  } catch (error) {
    next(error);
  }
};

// Delete a task
const deleteTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        errorMessage: "Task Not Found",
      });
    }

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        errorMessage: "Unauthorized action",
      });
    }

    await Task.findByIdAndDelete(taskId);

    res.json({ message: "Task Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskDetailsById,
  updateTaskDetailsById,
  deleteTaskById,
};
