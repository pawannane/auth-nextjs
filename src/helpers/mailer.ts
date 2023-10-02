import User from "@/models/userModel";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token 
    const hashedToken = await jwt.sign(userId.toString(), userId.toString());

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000
        })
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId,
        {
          forgotPasswordToken: hashedToken,
          fogotPasswordTokenExpiry: Date.now() + 3600000
        })
    }

    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      }
    });

    const mailOptions = {
      from: 'pawannane23@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "updatepassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "updatepassword"}?token=${hashedToken}</p>`
    }

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    throw new Error(error.message);

  }
}