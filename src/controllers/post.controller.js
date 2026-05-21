import "dotenv/config";
import {
  creatPost,
  getAllPost,
  removePost,
  updatePost,
} from "../services/post.services.js";

import cloudinary from "../config/cloudinary.js";
import { log } from "console";

const create = async (req, res) => {
  try {
    const post = await creatPost(req.body);



    // if (!req.file) {
    //   return res.status(400).json({
    //     message: "File Not Found!",
    //   });
    // }

    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "multerwithnodejsonsocialmediaapp",
    // });

    // const postData = {
    //   fileName: req.file.originalName,
    //   public_id: result.public_id,
    //   title: req.body.title,
    //   description: req.body.description,
    //   imageUrl: result.secure_url,
    // };

    // const postData = await creatPost(postData);

    res.status(201).json({
      // message: "New Post Created Successfully!",
      post,
      // postData,
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
