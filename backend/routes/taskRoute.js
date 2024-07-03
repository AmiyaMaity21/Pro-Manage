const express = require("express");
const taskController = require("../controllers/taskController");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", isAuthenticatedUser, taskController.createTask);
router.get("/all-tasks", isAuthenticatedUser, taskController.getAllTasks);
router.get("/details/:taskId", taskController.getTaskDetailsById);
router.put("/edit/:taskId", isAuthenticatedUser, taskController.updateTaskDetailsById);
router.delete("/delete/:taskId", isAuthenticatedUser, taskController.deleteTaskById);

module.exports = router;
