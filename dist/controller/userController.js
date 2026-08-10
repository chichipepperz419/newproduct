import userModel from "../model/userModel.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import { sendWelcomeEmail } from "../services/email.service.js";
import crypto from "crypto";
export const signup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const findExistingStudent = await userModel.findOne({ email });
        if (findExistingStudent) {
            throw new AppError("user already exists... proceed to sign in", 409);
        }
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);
        const newStudent = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user",
        });
        return res.status(201).json({
            message: "user created successfully",
            data: newStudent,
            id: newStudent?._id,
        });
    }
    catch (error) {
        next(error);
    }
};
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new AppError("invalid credentials", 401);
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new AppError("invalid password", 401);
        }
    }
    catch (error) {
        next(error);
    }
};
export const viewAllStudents = async (req, res, next) => {
    try {
        if (req.user?.role !== "lecturer") {
            throw new AppError("Access denied", 403);
        }
        const students = await userModel.find({ role: "student" });
        return res.status(200).json({
            message: "students retrieved successfully",
            data: students,
        });
    }
    catch (error) {
        next(error);
    }
};
const verificationToken = crypto.randomBytes(32).toString("hex");
const verificationExpired = new Date(Date.now() + 1000 * 60 * 5);
//create user
export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const findExistingUser = await userModel.findOne({ email });
        if (findExistingUser) {
            throw new AppError("user already exists....proceed to sign in", 409);
        }
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationExpired = new Date(Date.now() + 1000 * 60 * 5);
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user",
            verificationToken: verificationToken,
            verificationExpired: verificationExpired,
        });
        await sendWelcomeEmail(email, name, `${process.env.BASE_URL}/verify-email?token=${verificationToken}`).then(() => {
            console.log("Email sent successfully");
        }).catch((error) => {
            console.log("Error sending email", error);
        });
        return res.status(201).json({
            message: "User created successfully",
            data: newUser,
            id: newUser?._id,
        });
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new AppError("Invalid credentials", 401);
        }
        //create token
        const token = generateToken(user?._id, user.role);
        return res.status(200).json({
            message: "login successfull",
            data: user,
            token: token,
        });
    }
    catch (error) {
        next(error);
    }
};
//PROFILE PAGE
export const profile = async (req, res) => {
    try {
        return res.status(200).json({
            message: " Student Profile",
            data: req.user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "an error occured",
            error,
        });
    }
};
export const logout = async (req, res, next) => {
    try {
        return res.status(200).json({
            message: "logout successful",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "an error occured while logging out",
            error,
        });
    }
};
//get user : filtering
export const getUser = async (req, res) => {
    try {
        const role = req.query.role;
        const name = req.query.name;
        const filter = {};
        if (req.query.role) {
            filter.role = role;
        }
        if (req.query.name) {
            filter.name = name;
        }
        const user = await userModel.find(filter);
        return res.status(200).json({
            message: "users",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "An error occured",
            error,
        });
    }
};
// //get user : searching
// export const getUser = async (req: Request, res: Response) => {
//   try {
//     const search = req.query.search as string;
//     const user = await userModel.find({
//       name: { $regex: search, $options: "i" },
//     });
//     return res.status(200).json({
//       message: "users",
//       data: user,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "An error occured",
//       error,
//     });
//   }
// };
//get oneuser
export const getOneUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId).populate({
            path: "products",
            //populate is a mongoose method that fetches that replaces an objectid ref with the actual document it points to
        });
        return res.status(200).json({
            message: "user gotten",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error",
            error,
        });
    }
};
//update user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const user = await userModel.findByIdAndUpdate(id, {
            name,
        });
        return res.status(200).json({
            message: "User updated successfully",
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "An error occured",
            error,
        });
    }
};
//delete user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "user successfully deleted",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "An error occured while deleting",
            error,
        });
    }
};
// export const searchUser = async (req: Request, res: Response) => {
//   try {
//   const search = req.query.search as string;
//     const user = await userModel.find({
//       name: { $regex: search, $options: "i" },
//     });
//     return res.status(200).json({
//       message: "user gotten",
//       data: user,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error",
//       error,
//     });
//   }
// };
//# sourceMappingURL=userController.js.map