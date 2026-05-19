import { creatPost, getAllPost, removePost } from "../services/post.services";

const create = async (req, res) => {
  try {
    const post = await creatPost(req.body);
    res.status(200).json({
      message: "New Post Created Successfully!",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPosts = async () => {
  try {
    const posts = await getAllPost();
    res.status(200).json({
      message: "All Posts Fetched Successfully!",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    await removePost(req.params.id);
    res.status(200).json({
      message: "Post deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { create, getPosts, remove };