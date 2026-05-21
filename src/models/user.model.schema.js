import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  marks: {
    type: Number,
    required: true,
    max: 100,
    min: 0,
  },
  grade: {
    type: String,
    required: true,
    maxlength: 1,
    uppercase: true,
  },
});




// Pre-save hook to calculate grade based on marks
// This helps to automatically set the grade. So, frontend only needs to send marks, and grade will be calculated and saved in the database.

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("marks")) return next();

  if (user.marks >= 90) user.grade = "A";
  else if (user.marks >= 80) user.grade = "B";
  else if (user.marks >= 70) user.grade = "C";
  else if (user.marks >= 60) user.grade = "D";
  else user.grade = "F";

  next();
});

export default mongoose.model("User", userSchema);