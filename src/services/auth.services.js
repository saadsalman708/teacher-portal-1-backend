import Teacher from "../models/teacher.model.schema.js";
import bcrypt from "bcrypt";
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
  if (!teacher) throw new Error("Email not found!");
  if (!teacher.allowed)
    throw new Error("You're not allowed to login! Admin hasn't approved you.");
  const isMatch = await bcryptjs.compare(password, teacher.password);
  if (!isMatch) throw new Error("Invalid Email or Password!");

  const token = jwt.sign(
    { id: teacher._id, email: teacher.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return { teacher, token };
};

export { createTeacher, loginTeacher };