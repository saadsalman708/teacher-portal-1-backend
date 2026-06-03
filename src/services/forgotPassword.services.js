import crypto from "crypto";
import sendResetEmail from "./email.services.js";
import Teacher from "../models/teacher.model.schema.js";
import bcryptjs from "bcryptjs";

const forgotPasswordService = async (email) => {
  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    const error = new Error(
      "There is no teacher registered with that email address.",
    );
    error.statusCode = 404;
    throw error;
  }

  const rawResetToken = crypto.randomBytes(32).toString("hex");

  teacher.passwordResetToken = crypto
    .createHash("sha256")
    .update(rawResetToken)
    .digest("hex");

  teacher.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  await teacher.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.MAIN_URL}:${process.env.FRONTEND_PORT}/reset-password/${rawResetToken}`;

  try {
    await sendResetEmail(teacher.email, resetUrl);
    return {
      message: "Reset URL sent to email successfully!",
    };
  } catch (err) {
    console.log("=== RAW NODEMAILER ERROR ===", err);

    teacher.passwordResetToken = undefined;
    teacher.passwordResetExpires = undefined;
    await teacher.save({
      validateBeforeSave: false,
    });

    const error = new Error(
      "There was an error sending the email. Try again later.",
    );
    error.statusCode = 500;
    throw error;
  }
};

const resetPasswordService = async (token, newPass) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const teacher = await Teacher.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!teacher) {
    const error = new Error("Token is invalid or has expired.");
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(newPass, salt);

  teacher.password = hashedPassword;
  teacher.passwordResetToken = undefined;
  teacher.passwordResetExpires = undefined;

  await teacher.save();

  return {
    message: "Password updated Successfully!",
  };
};

export { forgotPasswordService, resetPasswordService };