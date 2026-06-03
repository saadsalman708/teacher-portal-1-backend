import { createTeacher, loginTeacher } from "../services/auth.services.js";
import { forgotPasswordService , resetPasswordService } from "../services/forgotPassword.services.js";
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

const forgotPassword = catchAsync( async (req , res , next) => {
  const result = await forgotPasswordService(req.body.email);
  
  res.status(200).json({
    success: true,
    message: result.message,
  });
});

const resetPassword = catchAsync( async (req , res , next) => {
  const {token} = req.params;
  const {password} = req.body;

  const result = await resetPasswordService(token , password);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

export { signup, login, getMe, forgotPassword, resetPassword };