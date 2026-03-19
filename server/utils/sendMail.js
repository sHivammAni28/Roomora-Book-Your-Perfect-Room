import transporter from "../configs/nodemailer.js";

export const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Roomora : Book Your Perfect Room" <${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log("Email error:", error.message);
  }
};
