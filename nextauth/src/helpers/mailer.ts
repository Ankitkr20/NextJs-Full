import User from "@/models/user.models";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import { MailtrapClient } from "mailtrap";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "e3a96ac777e48c", //
        pass: "0334b533cf316c", //
      },
    });
    let mailOptions;
    if (emailType === "VERIFY") {
      return await transport.sendMail({
        from: '"Ankit Kumar" <18krankit@gmail.com>',
        to: email,
        subject: "Verify Your Email",
        html: `<p>Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to "Verify Your email"
      or copy and paste the link below in your browser.
      <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
      });
    } else if (emailType === "RESET") {
      return await transport.sendMail({
        from: '"Ankit Kumar" <18krankit@gmail.com>',
        to: email,
        subject: "Reset Your Password",
        html: `<p>Click <a href = "${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to "Reset Your Password"
      or copy and paste the link below in your browser.
      <br>${process.env.DOMAIN}/resetpassword?token=${hashedToken}
      </p>`,
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
