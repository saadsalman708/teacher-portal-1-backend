import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    marks: {
        type: Number,
        required: true,
        max: 100,
        min: 0,
    },
    grade: {
        type: String,
        required: true,
        maxlength:1,
        uppercase: true,
    }
});

export default mongoose.model("User" , userSchema);