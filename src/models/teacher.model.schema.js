import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 8,
    },
    allowed: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model("Teacher", teacherSchema);