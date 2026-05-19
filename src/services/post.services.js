import Post from "../models/post.model.schema.js";

const getAllPost = async ()=>{
    return await Post.find({});
};

const creatPost = async (data) => {
    const Post = new Post.create(data);
    return Post;
};

const removePost = async (id) => {
    return Post.findByIdAndDelete(id);
};


export { creatPost , getAllPost , removePost };