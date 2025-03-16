import nodemailer from "nodemailer";

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "uguremirmustafa@gmail.com",
    pass: process.env.GOOGLE_APP_PASS,
  },
});

// Email options
const mailOptions = {
  from: "uguremirmustafa@gmail.com",
  to: "uguremirmustafa@gmail.com",
  subject: "Hello from Node.js!",
  text: "This is a test email sent from a Node.js process.",
};

// Send the email
async function sendEmail(subject: string, text: string) {
  try {
    const mail = { ...mailOptions, subject, text };
    console.log(mail);
    const info = await transporter.sendMail(mail);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export default sendEmail;
