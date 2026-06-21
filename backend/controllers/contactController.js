const Contact = require("../models/Contact");
const { sendContactMessage, sendContactEmail } = require("../utils/email");

// POST /api/contact
exports.sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    // Save to database
    const contact = await Contact.create({
      name,
      email,
      phone: phone || "",
      message,
      status: "unread",
    });

    // Send email notification to admin (non-blocking)
    sendContactEmail({
      name,
      email,
      phone: phone || "Not provided",
      message,
      contactId: contact._id,
    }).catch(() => {});

    res.status(201).json({
      success: true,
      message: "Message sent successfully! We'll reply within 2 hours.",
      contact,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/contact (Admin only - get all messages)
exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/contact/:id (Admin only - mark as read/reply)
exports.updateMessage = async (req, res, next) => {
  try {
    const { status, reply } = req.body;
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    if (status) message.status = status;
    if (reply) message.reply = reply;
    if (status === "read") message.readAt = new Date();

    await message.save();

    res.json({
      success: true,
      message: "Message updated successfully.",
      contact: message,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/contact/:id (Admin only - delete message)
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
