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
  lineItems: LineItem[];
}

export async function updateInvoiceMail(
  toEmail: string,
  invoiceDetails: invoiceFormSchema
) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER,
      to: toEmail,
      subject: `Invoice #${invoiceDetails.invoiceNumber}`,
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice Update</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      font-size: 16px;
    }
    .header {
      background-color: #0066cc;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px 30px;
    }
    .content h2 {
      margin-top: 0;
      color: #0066cc;
      font-size: 22px;
    }
    .content p {
      margin: 10px 0;
      line-height: 1.6;
    }
    .content ul {
      padding-left: 20px;
      margin: 10px 0;
    }
    .content li {
      margin: 5px 0;
    }
    .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #0066cc;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 10px;
        font-weight: bold;
        margin: 20px 0;
      }
      .button:hover {
        background-color: #0052a3;
      }
    .footer {
      background-color: #f8f9fa;
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #666666;
    }
    .line-item {
      margin: 5px 0;
      padding-left: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Invoice #${invoiceDetails.invoiceNumber}</h1>
    </div>
    <div class="content">
      <h2>Updated Invoice for ${invoiceDetails.toName}</h2>
      <p>
        I hope this email finds you well. Please find your invoice details below.
      </p>
      <p><strong>Invoice Details:</strong></p>
      <ul>
        <li><strong>From:</strong> ${invoiceDetails.fromName}</li>
        <li><strong>To:</strong> ${invoiceDetails.toName}</li>
        <li><strong>Date:</strong> ${invoiceDetails.date}</li>
        <li><strong>Due Date:</strong> ${invoiceDetails.dueDate}</li>
        <li><strong>Total Amount:</strong> ${invoiceDetails.total}</li>
      </ul>
    
      <p>
        You can download your invoice by clicking the button below:
      </p>
      <a href="http://localhost:3000/api/invoice/${
        invoiceDetails.invoiceId
      }" class="button">Download Invoice</a>
      <p>
        If you have any questions, feel free to reply to this email.
      </p>
      <p>Thank you for your business!</p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Your Company. All rights reserved.
    </div>
  </div>
</body>
</html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending invoice email:", error);
    return { success: false, error };
  }
}
