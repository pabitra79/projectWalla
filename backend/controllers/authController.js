const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  sendDeliveryEmail,
  sendOrderConfirmationEmail,
  sendContactEmail,
  sendOTPEmail,
  sendWelcomeEmail,
} = require("../utils/email");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, college, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered." });
    }

    const user = await User.create({
      name,
      email,
      phone,
      college,
      password,
      isVerified: true,
    });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.name).catch((err) =>
      console.log("Welcome email error:", err),
    );

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    console.log("📧 Forgot password request for:", email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // ✅ Use .select() to include all fields
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    console.log("✅ User found:", user.email);
    console.log("📱 User phone:", user.phone);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    console.log("🔑 Generated OTP:", otp);

    // ✅ Update with findOneAndUpdate and runValidators: false to skip validation
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          otp: otp,
          otpExpires: otpExpires,
        },
      },
      {
        new: true,
        runValidators: false, // ← Skip validation for OTP update
      },
    );

    console.log("💾 OTP saved:", updatedUser.otp);
    console.log("💾 OTP Expires:", updatedUser.otpExpires);

    // Send OTP email
    await sendOTPEmail(user.email, user.name, otp);

    res.json({
      success: true,
      message: "OTP sent to your email. Please check your inbox.",
      email: user.email,
    });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    next(error);
  }
};

// Verify OTP
exports.verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    console.log("🔍 Verify OTP request for:", email);
    console.log("🔍 OTP entered:", otp);

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    console.log("✅ User found:", user.email);
    console.log("🔑 OTP in DB:", user.otp);
    console.log("🔑 OTP type in DB:", typeof user.otp);
    console.log("🔑 OTP entered type:", typeof otp);
    console.log("⏰ OTP Expires in DB:", user.otpExpires);
    console.log("⏰ Current time:", new Date());

    // Check if OTP exists
    if (!user.otp) {
      console.log("❌ No OTP found in DB for this user");
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new one.",
      });
    }

    // Compare as string with trim
    const dbOtp = user.otp.toString().trim();
    const enteredOtp = otp.toString().trim();

    console.log(`🔍 Comparing: "${dbOtp}" === "${enteredOtp}"`);

    if (dbOtp !== enteredOtp) {
      console.log("❌ OTP mismatch");
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    // Check if expired
    if (user.otpExpires < new Date()) {
      console.log("❌ OTP expired");
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    console.log("✅ OTP verified successfully!");

    res.json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error("❌ Verify OTP error:", error);
    next(error);
  }
};
// Reset Password (after OTP verification)
exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    // Verify OTP again
    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP. Please request a new one.",
      });
    }

    // Update password
    user.password = newPassword;
    user.otp = "";
    user.otpExpires = null;
    await user.save();

    res.json({
      success: true,
      message:
        "Password reset successfully! You can now login with your new password.",
    });
  } catch (error) {
    next(error);
  }
};

// Resend OTP
exports.resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOTPEmail(user.email, user.name, otp);

    res.json({
      success: true,
      message: "New OTP sent to your email.",
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required." });
    }

    // Check for hardcoded admin (env-based)
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      let admin = await User.findOne({ email, role: "admin" }).select(
        "+password",
      );
      if (!admin) {
        admin = await User.create({
          name: "Admin",
          email: process.env.ADMIN_EMAIL,
          phone: "0000000000",
          password: process.env.ADMIN_PASSWORD,
          role: "admin",
        });
      }
      return sendToken(admin, 200, res);
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// PUT /api/auth/update-profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone, college } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, college },
      { new: true, runValidators: true },
    );
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
