import student from "../models/student.model.schema.js";

const getAllStudents = async (skip, limit) => {
  return await student.find({}).skip(skip).limit(limit);
};

const countTotalStudents = async () => {
  return await student.countDocuments();
};

const createStudent = async (data) => {
  return await student.create(data);
};

const removeStudent = async (id) => {
  return await student.findByIdAndDelete(id);
};

const updateStudent = async (id, data) => {
  return await student.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export {
  createStudent,
  getAllStudents,
  removeStudent,
  updateStudent,
  countTotalStudents,
};