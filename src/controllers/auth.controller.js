import jwt from "jsonwebtoken";

import { createNew } from "../services/auth.services.js";

const signup = async (req, res) => {
    try {
        const user = await createNew(req.body);
        res.status(201).json({
            message: "User created successfully!",
            user,
        });
    } catch (error) {
        const statusCode = error.message === "Email already exists!" ? 400 : 500;
        res.status(statusCode).json({
            message: error.message
        });
    }
};

const login 

export { signup };