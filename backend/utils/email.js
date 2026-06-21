const nodemailer = require("nodemailer");

// Fixed — force IPv4, add timeouts so it fails fast instead of hanging
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4, // ← force IPv4, fixes ENETUNREACH on Render
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Send OTP email
exports.sendOTPEmail = async (to, name, otp) => {
  try {
    const mailOptions = {
      from: `"ProjectWalla" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to,
      subject: "🔐 Password Reset OTP - ProjectWalla",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0f0a; padding: 30px; border-radius: 12px; border: 1px solid #1a2d4d; color: #e2e8f0;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #6366f1;">🔐 Password Reset</h2>
            <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #6366f1, #8b5cf6); margin: 10px auto; border-radius: 4px;"></div>
          </div>
          
          <p style="color: #e2e8f0;">Hi <strong>${name}</strong>,</p>
          <p style="color: #e2e8f0;">We received a request to reset your password. Use the OTP below to verify your identity:</p>
          
          <div style="text-align: center; margin: 30px 0; padding: 20px; background: #1a2d1a; border-radius: 12px; border: 1px solid #34d399;">
            <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #34d399; margin: 0;">
              ${otp}
            </p>
          </div>
          
          <p style="color: #94a3b8; font-size: 14px;">
            ⏳ This OTP is valid for <strong style="color: #e2e8f0;">10 minutes</strong>.
          </p>
          <p style="color: #64748b; font-size: 13px;">
            If you didn't request this, please ignore this email.
          </p>
          
          <hr style="border-color: #1a2d4d; margin: 20px 0;" />
          <p style="color: #64748b; font-size: 12px; text-align: center;">
            — Team ProjectWalla
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 OTP email sent to ${to}`);
    return true;
  } catch (error) {
    console.error("OTP email error:", error);
    return false;
  }
};

// Send welcome email after registration
exports.sendWelcomeEmail = async (to, name) => {
  try {
    const mailOptions = {
      from: `"ProjectWalla" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to,
      subject: "🎉 Welcome to ProjectWalla!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0f0a; padding: 30px; border-radius: 12px; border: 1px solid #1a2d4d; color: #e2e8f0;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #6366f1;">🎉 Welcome to ProjectWalla!</h2>
            <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #6366f1, #8b5cf6); margin: 10px auto; border-radius: 4px;"></div>
          </div>
          
          <p style="color: #e2e8f0;">Hi <strong>${name}</strong>,</p>
          <p style="color: #e2e8f0;">Thank you for joining ProjectWalla! We're excited to help you with your college projects.</p>
          
          <div style="background: #1a2d1a; padding: 16px; border-radius: 8px; border-left: 4px solid #34d399; margin: 20px 0;">
            <p style="color: #e2e8f0; margin: 0;">
              🚀 <strong>What you can do now:</strong>
            </p>
            <ul style="color: #94a3b8; padding-left: 20px;">
              <li>Browse our 12+ ready-made projects</li>
              <li>Request a custom project</li>
              <li>Track your orders in dashboard</li>
            </ul>
          </div>
          
          <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/projects" 
             style="display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 10px 0;">
            Browse Projects →
          </a>
          
          <hr style="border-color: #1a2d4d; margin: 20px 0;" />
          <p style="color: #64748b; font-size: 12px; text-align: center;">
            — Team ProjectWalla
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Welcome email sent to ${to}`);
    return true;
  } catch (error) {
    console.error("Welcome email error:", error);
    return false;
  }
};
exports.sendOrderConfirmationEmail = async (to, orderDetails) => {
  const { studentName, projectName, orderId, budget, deadline } = orderDetails;

  await transporter.sendMail({
    from: `"ProjectWalla" <${process.env.EMAIL_USER}>`,
    to,
    subject: `✅ Order Confirmed - ${projectName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0f0a; padding: 20px; border-radius: 12px; border: 1px solid #1a2d4d;">
        <h2 style="color: #6366f1;">ProjectWalla - Order Confirmed!</h2>
        <p style="color: #e2e8f0;">Hi <strong>${studentName}</strong>,</p>
        <p style="color: #e2e8f0;">Your order has been placed successfully. Here are the details:</p>
        <table style="width:100%; border-collapse: collapse; color: #e2e8f0;">
          <tr><td style="padding:8px; border:1px solid #1a2d4d;"><strong>Order ID</strong></td><td style="padding:8px; border:1px solid #1a2d4d;">${orderId}</td></tr>
          <tr><td style="padding:8px; border:1px solid #1a2d4d;"><strong>Project</strong></td><td style="padding:8px; border:1px solid #1a2d4d;">${projectName}</td></tr>
          <tr><td style="padding:8px; border:1px solid #1a2d4d;"><strong>Budget</strong></td><td style="padding:8px; border:1px solid #1a2d4d;">₹${budget}</td></tr>
          <tr><td style="padding:8px; border:1px solid #1a2d4d;"><strong>Deadline</strong></td><td style="padding:8px; border:1px solid #1a2d4d;">${new Date(deadline).toDateString()}</td></tr>
        </table>
        <p style="color: #e2e8f0; margin-top:20px;">Please complete the payment to proceed. We'll start working once payment is confirmed.</p>
        <p style="color:#64748b;">— Team ProjectWalla</p>
      </div>
    `,
  });
};

exports.sendDeliveryEmail = async (to, details) => {
  const { studentName, projectName, fileUrl } = details;

  await transporter.sendMail({
    from: `"ProjectWalla" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🎉 Your Project is Ready - ${projectName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0f0a; padding: 20px; border-radius: 12px; border: 1px solid #1a2d4d;">
        <h2 style="color: #10b981;">Your Project is Delivered!</h2>
        <p style="color: #e2e8f0;">Hi <strong>${studentName}</strong>,</p>
        <p style="color: #e2e8f0;">Great news! Your project <strong>${projectName}</strong> is ready.</p>
        ${fileUrl ? `<p><a href="${fileUrl}" style="background:#6366f1;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;">Download Project</a></p>` : ""}
        <p style="color: #e2e8f0;">Login to your dashboard to download and view your project.</p>
        <p style="color:#64748b;">— Team ProjectWalla</p>
      </div>
    `,
  });
};

// ✅ NEW: Send contact message notification to admin
exports.sendContactEmail = async (data) => {
  try {
    const { name, email, phone, message, contactId } = data;

    const mailOptions = {
      from: `"ProjectWalla Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || "help.projectwalla@gmail.com",
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0f0a; padding: 20px; border-radius: 12px; border: 1px solid #1a2d4d; color: #e2e8f0;">
          <h2 style="color: #34d399;">📬 New Contact Message</h2>
          <hr style="border-color: #1a2d4d;" />
          
          <p><strong style="color: #34d399;">Name:</strong> ${name}</p>
          <p><strong style="color: #34d399;">Email:</strong> <a href="mailto:${email}" style="color: #34d399;">${email}</a></p>
          <p><strong style="color: #34d399;">Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong style="color: #34d399;">Message:</strong></p>
          <div style="background: #1a2d1a; padding: 16px; border-radius: 8px; border-left: 4px solid #34d399; color: #e2e8f0;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
          <hr style="border-color: #1a2d4d;" />
          <p style="color: #94a3b8; font-size: 12px;">
            Message ID: ${contactId}<br/>
            Reply to: <a href="mailto:${email}" style="color: #34d399;">${email}</a>
          </p>
          <div style="margin-top: 16px; padding: 12px; background: #1a2d1a; border-radius: 8px;">
            <p style="color: #94a3b8; font-size: 12px;">
              💡 <strong>Quick Actions:</strong><br/>
              • <a href="mailto:${email}?subject=Re: Your Message to ProjectWalla" style="color: #34d399;">Reply via Email</a><br/>
              • <a href="https://wa.me/918787565964?text=Hi ${encodeURIComponent(name)}, I got your message about: ${encodeURIComponent(message.substring(0, 50))}..." style="color: #34d399;">Reply via WhatsApp</a>
            </p>
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 16px;">
            This is an automated notification from ProjectWalla.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Contact email sent to admin for ${email}`);
    return true;
  } catch (error) {
    console.error("Contact email error:", error);
    return false;
  }
};

// ✅ NEW: Send reply to user (when admin replies)
exports.sendReplyEmail = async (to, data) => {
  try {
    const { name, reply, message } = data;

    const mailOptions = {
      from: `"ProjectWalla Support" <${process.env.EMAIL_USER}>`,
      to,
      subject: `💬 Reply from ProjectWalla Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0f0a; padding: 20px; border-radius: 12px; border: 1px solid #1a2d4d; color: #e2e8f0;">
          <h2 style="color: #6366f1;">💬 Reply from ProjectWalla Team</h2>
          <p style="color: #e2e8f0;">Hi <strong>${name}</strong>,</p>
          <p style="color: #e2e8f0;">Thank you for reaching out to us. Here's our response:</p>
          <div style="background: #1a2d1a; padding: 16px; border-radius: 8px; border-left: 4px solid #6366f1; color: #e2e8f0;">
            ${reply.replace(/\n/g, "<br/>")}
          </div>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 16px;">
            Your original message: <br/>
            <span style="color: #64748b;">"${message.substring(0, 100)}${message.length > 100 ? "..." : ""}"</span>
          </p>
          <p style="color: #64748b; margin-top: 20px;">
            — Team ProjectWalla
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Reply email sent to ${to}`);
    return true;
  } catch (error) {
    console.error("Reply email error:", error);
    return false;
  }
};
exports.testEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("✅ Email transporter is ready");
    return true;
  } catch (error) {
    console.error("❌ Email connection failed:", error.message);
    return false;
  }
};
// Add these functions to your email.js

// Send payment confirmation email
exports.sendPaymentConfirmationEmail = async (to, details) => {
  const { studentName, projectName, amount, orderId } = details;

  await transporter.sendMail({
    from: `"ProjectWalla" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to,
    subject: `💰 Payment Received - ${projectName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0f0a; padding: 20px; border-radius: 12px; border: 1px solid #1a2d4d;">
        <h2 style="color: #34d399;">💰 Payment Received!</h2>
        <p style="color: #e2e8f0;">Hi <strong>${studentName}</strong>,</p>
        <p style="color: #e2e8f0;">We have received your payment of <strong style="color: #34d399;">$${amount}</strong> for <strong>${projectName}</strong>.</p>
        <p style="color: #e2e8f0;">We will start working on your project shortly.</p>
        <p style="color:#64748b;">— Team ProjectWalla</p>
      </div>
    `,
  });
};
