const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  forgotPassword,
  verifyOTP,
  resetPassword,
  resendOTP,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/update-profile", protect, updateProfile);

// Forgot Password routes
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOTP);

module.exports = router;
