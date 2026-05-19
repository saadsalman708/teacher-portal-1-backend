import Post from "../models/post.model.schema.js";

const getAllPost = async () => {
  return await Post.find({});
};

const creatPost = async (data) => {
  return await Post.create(data);
};

const removePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

const updatePost = async (id, data) => {
  return await Post.findByIdAndUpdate(id, data, { new: true });
};

export { creatPost, getAllPost, removePost, updatePost };
