import jwt from "jsonwebtoken";
import Teacher from "../models/teacher.model.schema.js";

const protectTeacherRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log(req);
      return res.status(401).json({
        message: "Unauthorized: No token provided!",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await Teacher.findById(decodedToken.id);
    req.teacher = teacher;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized: Invalid token!",
    });
  }
};

export default protectTeacherRoute;