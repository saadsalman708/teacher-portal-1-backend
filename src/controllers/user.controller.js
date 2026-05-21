import "dotenv/config";
import {
  creatUser,
  getAllUsers,
  removeUser,
  updateUser,
  countTotalUsers,
} from "../services/users.services.js";

const create = async (req, res) => {
  try {
    const user = await creatUser(req.body);

    res.status(201).json({
      message: "New User Created Successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    // const users = await getAllUsers();

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 7;
    let skip = (page - 1) * limit;

    const paginatedTotleUsers = await getAllUsers(skip, limit);

    const totalUsers = await countTotalUsers();
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      message: "All Users Fetched Successfully!",
      users: paginatedTotleUsers,
      totalUsers,
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
    await removeUser(req.params.id);
    res.status(200).json({
      message: "User deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.status(200).json({
      message: "User updated successfully!",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { create, getUsers, remove, update };
