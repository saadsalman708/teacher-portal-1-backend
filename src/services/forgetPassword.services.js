import crypto from "crypto";
import sendResetEmail from "./email.services.js";
import Teacher from "../models/teacher.model.schema.js";

const forgetPasswordService = async (email) => {
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

  const resetURL = `${process.env.MAIN_URL}:${process.env.PORT}/reset-password/${rawResetToken}`;

  try {
    await sendResetEmail(teacher.email, resetUrl);
    return {
      message: "Token sent to email successfully!",
    };
  } catch (error) {
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

export default forgetPasswordService;
