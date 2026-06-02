import { createTeacher, loginTeacher } from "../services/auth.services.js";

const signup = async (req, res) => {
  try {
    const user = await createTeacher(req.body);
    res.status(201).json({
      message: "User created successfully!",
      user,
    });
  } catch (error) {
    const statusCode = error.message === "Email already exists!" ? 400 : 500;
    res.status(statusCode).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
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
  } catch (error) {
const statusCode = error.statusCode || 500;
    
    res.status(statusCode).json({
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      teacher: req.teacher,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { signup , login , getMe };