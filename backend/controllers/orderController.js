const Order = require("../models/Order");
const Project = require("../models/Project");
const {
  sendOrderConfirmationEmail,
  sendDeliveryEmail,
  sendPaymentConfirmationEmail,
  sendContactEmail,
} = require("../utils/email");

// POST /api/orders  (student places order)
exports.createOrder = async (req, res, next) => {
  try {
    const { projectId, programmingLanguage, deadline, budget, requirements } =
      req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    const order = await Order.create({
      student: req.user._id,
      project: projectId,
      studentName: req.user.name,
      studentEmail: req.user.email,
      studentPhone: req.user.phone,
      college: req.user.college,
      projectName: project.title,
      programmingLanguage,
      deadline,
      budget,
      requirements,
      totalAmount: budget, // Total amount is the budget
      paidAmount: 0, // Initially no payment
      dueAmount: budget, // Initially full amount is due
      paymentPercentage: 0, // Initially 0%
      paymentStatus: "pending", // Initial status
    });

    // Increment project order count
    await Project.findByIdAndUpdate(projectId, { $inc: { totalOrders: 1 } });

    // Send confirmation email (non-blocking)
    sendOrderConfirmationEmail(req.user.email, {
      studentName: req.user.name,
      projectName: project.title,
      orderId: order._id.toString().slice(-8).toUpperCase(),
      budget,
      deadline,
    }).catch(() => {});

    const populated = await Order.findById(order._id).populate(
      "project",
      "title techTags price",
    );
    res.status(201).json({ success: true, order: populated });
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/my  (student sees their orders)
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ student: req.user._id })
      .populate("project", "title techTags price")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/:id  (student sees single order)
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("project");
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });

    // Students can only see their own orders
    if (
      req.user.role !== "admin" &&
      order.student.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized." });
    }

    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// PUT /api/orders/:id/payment  (student submits UTR after paying)
exports.submitPayment = async (req, res, next) => {
  try {
    const { utrNumber } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    if (order.student.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized." });
    }

    order.utrNumber = utrNumber;
    order.paymentStatus = "pending"; // admin will confirm
    await order.save();

    res.json({
      success: true,
      message: "Payment submitted. Admin will verify soon.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// ─── ADMIN ROUTES ─────────────────────────────────────────────────────────────

// GET /api/admin/orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const {
      status,
      paymentStatus,
      projectId,
      page = 1,
      limit = 20,
    } = req.query;
    const filter = {};
    if (status) filter.orderStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (projectId) filter.project = projectId;

    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate("student", "name email phone college")
        .populate("project", "title techTags")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Order.countDocuments(filter),
    ]);

    res.json({ success: true, total, page: Number(page), orders });
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/orders/:id/status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus, adminNotes, deliveryFileUrl } =
      req.body;
    const order = await Order.findById(req.params.id)
      .populate("student", "name email")
      .populate("project", "title");

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
      if (paymentStatus === "paid") order.paymentDate = new Date();
    }
    if (adminNotes !== undefined) order.adminNotes = adminNotes;
    if (deliveryFileUrl) {
      order.deliveryFileUrl = deliveryFileUrl;
      order.deliveredAt = new Date();
    }

    await order.save();

    // Send delivery email if delivered
    if (orderStatus === "delivered") {
      sendDeliveryEmail(order.student.email, {
        studentName: order.student.name,
        projectName: order.project.title,
        fileUrl: order.deliveryFileUrl,
      }).catch(() => {});
    }

    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/stats
exports.getAdminStats = async (req, res, next) => {
  try {
    const [
      totalOrders,
      pendingOrders,
      deliveredOrders,
      paidOrders,
      totalStudents,
      recentOrders,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ orderStatus: "pending" }),
      Order.countDocuments({ orderStatus: "delivered" }),
      Order.countDocuments({ paymentStatus: "paid" }),
      require("../models/User").countDocuments({ role: "student" }),
      Order.find({ paymentStatus: "paid" }).select("budget"),
    ]);

    const totalEarnings = recentOrders.reduce(
      (sum, o) => sum + (o.budget || 0),
      0,
    );

    res.json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        deliveredOrders,
        paidOrders,
        totalStudents,
        totalEarnings,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/students
exports.getAllStudents = async (req, res, next) => {
  try {
    const User = require("../models/User");
    const students = await User.find({ role: "student" }).sort({
      createdAt: -1,
    });
    res.json({ success: true, count: students.length, students });
  } catch (error) {
    next(error);
  }
};

// POST /api/orders/custom  (student requests their OWN project idea — not from our catalog)
exports.createCustomOrder = async (req, res, next) => {
  try {
    const {
      projectName,
      college,
      programmingLanguage,
      deadline,
      budget,
      requirements,
    } = req.body;

    if (!projectName || !projectName.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Project name is required." });
    }

    const order = await Order.create({
      student: req.user._id,
      project: undefined, // no catalog project — client-defined
      isCustom: true,
      studentName: req.user.name,
      studentEmail: req.user.email,
      studentPhone: req.user.phone,
      college: college || req.user.college,
      projectName: projectName.trim(),
      programmingLanguage,
      deadline,
      budget,
      requirements,
      totalAmount: budget,
      paidAmount: 0,
      dueAmount: budget,
      paymentPercentage: 0,
      paymentStatus: "pending",
    });

    // Send confirmation email (non-blocking)
    sendOrderConfirmationEmail(req.user.email, {
      studentName: req.user.name,
      projectName: order.projectName,
      orderId: order._id.toString().slice(-8).toUpperCase(),
      budget,
      deadline,
    }).catch(() => {});

    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};
// PUT /api/orders/:id/payment  (student submits UTR after paying)
// PUT /api/orders/:id/payment  (student submits UTR after paying)
exports.submitPayment = async (req, res, next) => {
  try {
    const {
      utrNumber,
      paidAmount,
      dueAmount,
      paymentPercentage,
      paymentStatus,
      totalAmount,
    } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }
    if (order.student.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized." });
    }

    // Calculate amounts properly
    const total = totalAmount || order.budget || order.totalAmount || 0;
    const paid = Number(paidAmount) || 0;
    const due = total - paid;
    const percentage = Number(paymentPercentage) || 0;

    // Determine payment status
    let status = paymentStatus || "pending";
    if (percentage >= 100) {
      status = "paid";
    } else if (percentage > 0 && percentage < 100) {
      status = "partial";
    }

    // In submitPayment function
    if (paymentStatus === "paid" || paymentStatus === "partial") {
      sendPaymentConfirmationEmail(req.user.email, {
        studentName: req.user.name,
        projectName: order.projectName,
        amount: paidAmount,
        orderId: order._id.toString().slice(-8).toUpperCase(),
      }).catch(() => {});
    }

    // Update payment details
    order.utrNumber = utrNumber || order.utrNumber;
    order.paidAmount = paid;
    order.dueAmount = due;
    order.paymentPercentage = percentage;
    order.totalAmount = total;
    order.paymentStatus = status;
    order.paymentDate = new Date();

    await order.save();

    res.json({
      success: true,
      message: "Payment submitted. Admin will verify soon.",
      order,
    });
  } catch (error) {
    next(error);
  }
};
