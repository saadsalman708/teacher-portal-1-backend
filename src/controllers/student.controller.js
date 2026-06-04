import "dotenv/config";
import {
  createStudent,
  getAllStudents,
  removeStudent,
  updateStudent,
  countTotalStudents,
} from "../services/students.services.js";

const create = async (req, res, next) => {
  try {
    const student = await createStudent(req.body);

    res.status(201).json({
      message: "New student Created Successfully!",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStudents = async (req, res) => {
  try {
    // const students = await getAllStudents();

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 7;
    let skip = (page - 1) * limit;
    let search = req.query.search || "";

    let sortBy = req.query.sortBy || "_id";
    let sortOrder = req.query.sortOrder || "desc";

    // 2. ✅ PASS them into your service function here
    const paginatedTotalStudents = await getAllStudents(
      skip,
      limit,
      search,
      sortBy,
      sortOrder,
    );

    const totalStudents = await countTotalStudents(search);
    const totalPages = Math.ceil(totalStudents / limit);

    res.status(200).json({
      message: "All students Fetched Successfully!",
      students: paginatedTotalStudents,
      totalStudents,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    await removeStudent(req.params.id);
    res.status(200).json({
      message: "student deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const updatedstudent = await updateStudent(req.params.id, req.body);
    res.status(200).json({
      message: "student updated successfully!",
      updatedstudent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { create, getStudents, remove, update };
