import Teacher from "../models/teacher.model.schema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const createTeacher = async (data) => {
  const { name, email, password } = data;
  const existingTeacher = await Teacher.findOne({ email });
  if (existingTeacher) {
    throw new Error("Email already exists!");
  }
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  // const hashedPassword = await bcrypt.hash(password, 10);
  const newTeacher = await Teacher.create({
    name,
    email,
    password: hashedPassword,
  });
  return newTeacher;
};

const loginTeacher = async (data) => {
  const { email, password } = data;
  const teacher = await Teacher.findOne({ email }).select("+password");
  if (!teacher) {
    const error = new Error("Email not found!");
    error.statusCode = 404; // 🔍 404 means Not Found
    throw error;
  }
  if (!teacher.allowed){
const error = new Error("You're not allowed to login! Admin hasn't approved you.");
    error.statusCode = 403; // 🔍 403 means Forbidden/Unapproved
    throw error;
  };
  const isMatch = await bcryptjs.compare(password, teacher.password);
  if (!isMatch) {
    const error = new Error("Invalid Email or Password!");
    error.statusCode = 401; // 🔍 401 means Unauthorized/Wrong Password
    throw error;
  };

  const token = jwt.sign(
    { id: teacher._id, email: teacher.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return { teacher, token };
};

export { createTeacher, loginTeacher };