import mongoose, { model } from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        imageUrl: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("post" , postSchema);