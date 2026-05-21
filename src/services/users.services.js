import User from "../models/user.model.schema.js";

const getAllUsers = async () => {
  return await User.find({});
};

const creatUser = async (data) => {
  return await User.create(data);
};

const removeUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export { creatUser, getAllUsers, removeUser, updateUser };