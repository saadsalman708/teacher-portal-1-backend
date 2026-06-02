import { createTeacher, loginTeacher } from "../services/auth.services.js";
import { catchAsync } from "../utils/catchAsync.js";

const signup = catchAsync(async (req, res, next) => {
  const user = await createTeacher(req.body);
  res.status(201).json({
    message: "User created successfully!",
    user,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { teacher, token } = await loginTeacher(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  const teacherData = teacher.toObject();
  delete teacherData.password;

  res.status(200).json({
    message: "Login Successfully!",
    teacherData,
  });
});

const getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    success: true,
    teacher: req.teacher,
  });
});

export { signup, login, getMe };