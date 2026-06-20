const express = require("express");
const router = express.Router();
const {
  sendContactMessage,
  getAllMessages,
  updateMessage,
  deleteMessage,
} = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/auth");

// Public - send message
router.post("/", sendContactMessage);

// Admin only
router.get("/admin/all", protect, adminOnly, getAllMessages);
router.put("/admin/:id", protect, adminOnly, updateMessage);
router.delete("/admin/:id", protect, adminOnly, deleteMessage);

module.exports = router;
