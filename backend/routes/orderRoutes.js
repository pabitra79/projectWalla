const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  createCustomOrder,
  submitPayment,
  getAllOrders,
  updateOrderStatus,
  getAdminStats,
  getAllStudents,
} = require("../controllers/orderController");
const { protect, adminOnly } = require('../middleware/auth');

// ── Admin routes FIRST (must be before /:id or "admin" gets swallowed) ──
router.get('/admin/stats', protect, adminOnly, getAdminStats);
router.get('/admin/students', protect, adminOnly, getAllStudents);
router.get('/admin/all', protect, adminOnly, getAllOrders);
router.put('/admin/:id/status', protect, adminOnly, updateOrderStatus);

// ── Student routes ──
router.post('/', protect, createOrder);
router.post('/custom', protect, createCustomOrder); // ← must be befo
router.get('/my', protect, getMyOrders);
router.put('/:id/payment', protect, submitPayment);
router.get('/:id', protect, getOrder);   // ← keep last

module.exports = router;
