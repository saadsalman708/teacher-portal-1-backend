import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
    maxlength: 1,
    uppercase: true,
  },
});

// Pre-save hook to calculate grade based on marks
// This helps to automatically set the grade. So, frontend only needs to send marks, and grade will be calculated and saved in the database.

// studentSchema.pre("save", function (next) {
studentSchema.pre("save", function () {
  const student = this;
  // if (!student.isModified("marks")) return next();
  if (!student.isModified("marks")) return ;

  if (student.marks >= 90) student.grade = "A";
  else if (student.marks >= 80) student.grade = "B";
  else if (student.marks >= 70) student.grade = "C";
  else if (student.marks >= 60) student.grade = "D";
  else student.grade = "F";

  // next();
});

export default mongoose.model("Students", studentSchema);