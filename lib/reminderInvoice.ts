import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587", 10), // Ensure it's parsed as an integer
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface invoiceFormSchema {
  invoiceNumber: string;
  fromName: string;
  fromEmail: string;
  toName: string;
  toEmail: string;
  date: string;
  dueDate: string;
  subTotal: number;
  total: number;
  invoiceId: string;
  currency: string;
  lineItems: LineItem[];
}

export async function sendReminderInvoiceMail(
  toEmail: string,
  invoiceDetails: invoiceFormSchema
) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER,
      to: toEmail,
      subject: `Reminder Payment for  Invoice #${invoiceDetails.invoiceNumber}`,
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Reminder</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      font-size: 16px;
    }
    .header {
      background-color: #0056b3;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 25px 30px;
    }
    .content h2 {
      margin-top: 0;
      color: #0056b3;
      font-size: 20px;
    }
    .content p {
      margin: 12px 0;
      line-height: 1.6;
    }
    .content ul {
      padding-left: 20px;
      margin: 10px 0;
    }
    .content li {
      margin: 8px 0;
    }
    .button {
      display: inline-block;
      padding: 12px 20px;
      color: #ffffff;
      background-color: #0056b3;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #003f8a;
    }
    .footer {
      background-color: #f8f9fa;
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #666;
      border-top: 1px solid #eaeaea;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Payment Reminder: Invoice #${invoiceDetails.invoiceNumber}</h1>
    </div>
    <div class="content">
      <h2>Hello ${invoiceDetails.toName},</h2>
      <p>We hope this message finds you well. This is a friendly reminder that payment for the following invoice is due:</p>
      <ul>
        <li><strong>From:</strong> ${invoiceDetails.fromName}</li>
        <li><strong>To:</strong> ${invoiceDetails.toName}</li>
        <li><strong>Invoice Date:</strong> ${invoiceDetails.date}</li>
        <li><strong>Due Date:</strong> ${invoiceDetails.dueDate}</li>
        <li><strong>Total Amount:</strong> ${invoiceDetails.total} ${
        invoiceDetails.currency
      }</li>
      </ul>
      <p>To settle this invoice, you can download it using the button below:</p>
      <a href="http://localhost:3000/api/invoice/${
        invoiceDetails.invoiceId
      }" class="button" style="color: #ffffff;">Download Invoice</a>
      <p>If you have already made the payment, please disregard this message. Feel free to contact us if you have any questions or need assistance.</p>
      <p>Thank you for your prompt attention to this matter!</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
    </div>
  </div>
</body>
</html>

      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Reminder Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending reminder invoice email:", error);
    return { success: false, error };
  }
}
