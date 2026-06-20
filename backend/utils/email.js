const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOrderConfirmationEmail = async (to, orderDetails) => {
  const { studentName, projectName, orderId, budget, deadline } = orderDetails;

  await transporter.sendMail({
    from: `"ProjectWalla" <${process.env.EMAIL_USER}>`,
    to,
    subject: `✅ Order Confirmed - ${projectName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #6366f1;">ProjectWalla - Order Confirmed!</h2>
        <p>Hi <strong>${studentName}</strong>,</p>
        <p>Your order has been placed successfully. Here are the details:</p>
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Order ID</strong></td><td style="padding:8px; border:1px solid #ddd;">${orderId}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Project</strong></td><td style="padding:8px; border:1px solid #ddd;">${projectName}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Budget</strong></td><td style="padding:8px; border:1px solid #ddd;">₹${budget}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Deadline</strong></td><td style="padding:8px; border:1px solid #ddd;">${new Date(deadline).toDateString()}</td></tr>
        </table>
        <p style="margin-top:20px;">Please complete the payment to proceed. We'll start working once payment is confirmed.</p>
        <p style="color:#888;">— Team ProjectWalla</p>
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #10b981;">Your Project is Delivered!</h2>
        <p>Hi <strong>${studentName}</strong>,</p>
        <p>Great news! Your project <strong>${projectName}</strong> is ready.</p>
        ${fileUrl ? `<p><a href="${fileUrl}" style="background:#6366f1;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;">Download Project</a></p>` : ''}
        <p>Login to your dashboard to download and view your project.</p>
        <p style="color:#888;">— Team ProjectWalla</p>
      </div>
    `,
  });
};
