import {
  creatPost,
  getAllPost,
  removePost,
  updatePost,
} from "../services/post.services.js";

import cloudinary from "../config/cloudinary.js";

const create = async (req, res) => {
  try {
    const post = await creatPost(req.body);

    if (req.file) {
      return res.status(400).json({
        message: "File Not Found!"
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path , {
      folder: "multerwithnodejsonsocialmediaapp"
    });

    const saveFile = await File.create({
      fileName: req.file.originalName,
      public_id: result.public_id,
      imageUrl: result.secure_url,
    });

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

const getPosts = async (req, res) => {
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

const update = async (req, res) => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body);
    res.status(200).json({
      message: "Post updated successfully!",
      updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { create, getPosts, remove, update };