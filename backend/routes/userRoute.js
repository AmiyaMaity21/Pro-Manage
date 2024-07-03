const express = require("express");
const userController = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", isAuthenticatedUser, userController.getUserDetails);
router.post("/addUser", isAuthenticatedUser, userController.addUser);
router.put("/update",isAuthenticatedUser,userController.updateUserDetails);
router.get("/logout", userController.logoutUser);

module.exports = router;
