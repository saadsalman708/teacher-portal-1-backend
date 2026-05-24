    import Teacher from "../models/teacher.model.schema.js";
    import bcrypt from "bcrypt";
    import bcryptjs from "bcryptjs";

    const createNew = async (data) => {
    const { name, email, password } = data;
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
        throw new Error("Email already exists!");        
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = await Teacher.create({
        name,
        email,
        password: hashedPassword,
    });
    return newTeacher;
    };

    export { createNew };
