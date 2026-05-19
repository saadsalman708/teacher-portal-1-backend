import Post from "../models/post.model.schema.js";

const getAllPost = async () => {
  return await Post.find({});
};

const creatPost = async (data) => {
  return await Post.create(data);
};

const removePost = async (id) => {
  return Post.findByIdAndDelete(id);
};

export { creatPost, getAllPost, removePost };