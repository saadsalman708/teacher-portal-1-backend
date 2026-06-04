import student from "../models/student.model.schema.js";

const getAllStudents = async (
  skip,
  limit,
  search = "",
  sortBy = "_id",
  sortOrder = "desc",
) => {
  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { grade: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  // ✅ Foolproof format: if sortOrder is "desc", prepends a minus sign (e.g., "-marks" or "name")
  const sortString = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;

  return await student
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort(sortString)
    .collation({ locale: "en", strength: 2 }); // Pass the string here instead
};

const countTotalStudents = async (search = "") => {
  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { grade: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  // ✅ Changed to lowercase 'student' to match your import
  return await student.countDocuments(query);
};

const createStudent = async (data) => {
  return await student.create(data);
};

const removeStudent = async (id) => {
  return await student.findByIdAndDelete(id);
};

const updateStudent = async (id, data) => {
  // 1. Fetch the student document from the database
  const studentDoc = await student.findById(id);
  if (!studentDoc) throw new Error("Student not found");

  // 2. Update the fields manually if they are provided in the request body
  if (data.name !== undefined) studentDoc.name = data.name;
  if (data.email !== undefined) studentDoc.email = data.email;
  if (data.marks !== undefined) studentDoc.marks = Number(data.marks); // Ensure it's a number

  // 3. Save the document! This explicitly triggers your pre("save") hook to recalculate the grade.
  return await studentDoc.save();
};

// const updateStudent = async (id, data) => {
//   return await student.findByIdAndUpdate(id, data, {
//     new: true,
//     runValidators: true,
//   });
// };

export {
  createStudent,
  getAllStudents,
  removeStudent,
  updateStudent,
  countTotalStudents,
};
