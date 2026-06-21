const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: false,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    // Snapshot of details at time of order
    studentName: String,
    studentEmail: String,
    studentPhone: String,
    college: String,
    projectName: String,

    // Order specifics
    programmingLanguage: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    requirements: {
      type: String,
      default: "",
    },
    // ✅ Payment tracking fields
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    dueAmount: {
      type: Number,
      default: 0,
    },
    paymentPercentage: {
      type: Number,
      default: 0,
    },

    // Status flow: pending → paid → in_progress → delivered
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "in_progress", "delivered", "cancelled"],
      default: "pending",
    },

    // Payment details
    utrNumber: {
      type: String,
      default: "",
    },
    paymentMethod: {
      type: String,
      default: "UPI",
    },
    paymentDate: {
      type: Date,
    },

    // Delivery
    deliveryFileUrl: {
      type: String,
      default: "",
    },
    deliveredAt: {
      type: Date,
    },

    // Admin notes
    adminNotes: {
      type: String,
      default: "",
    },
    // for forgot password
    otp: {
      type: String,
      default: "",
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },

  // use
);

module.exports = mongoose.model("Order", orderSchema);
