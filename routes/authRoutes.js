const express = require("express");
const router = express.Router();

const {
  register,
  login,
  loginAdmin,
  requestResetPassword,
  resetPassword,
} = require("../controllers/authController");

// AUTH EXISTING
router.post("/register", register);
router.post("/login", login);
router.post("/login-admin", loginAdmin);

// 🔐 RESET PASSWORD
router.post("/request-reset-password", requestResetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;