import userModel from "../model/userModel.js";
import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";







export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
  }catch (error){
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if(!user) {
      throw new AppError("invalid credentials", 401);
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) {
      throw new AppError ("invalid password", 401);
    }

  }catch(error){
    next(error);
  }
};

export const viewAllStudents = async(
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
     if (req.user?.role !== "lecturer") {
   throw new AppError("Access denied", 403);
}
const students = await userModel.find({ role: "student" });

    return res.status(200).json({
      message: "students retrieved successfully",
      data: students,
    });
   
  }catch(error){
    next(error);
  }
}   



//create user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, role } = req.body;
    const findExistingUser = await userModel.findOne({ email });
    if (findExistingUser) {
      throw new AppError("user already exists... proceed to sign in", 409);
    }
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    return res.status(201).json({
      message: "user created successfully",
      data: newUser,
      id: newUser?._id,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
  } catch (error) {
     next(error);
  }
};

//PROFILE PAGE

export const profile = async (req: any, res: Response) => {
  try {
    return res.status(200).json({
      message: " Student Profile",
      data: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "an error occured",
      error,
    });
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.status(200).json({
      message: "logout successful",
    })

  }catch(error){
    return res.status(500).json({
      message: "an error occured while logging out",
      error,
    })
  }
}

//getuser
export const getUser = async (req: Request, res: Response) => {
  try {
    const finduser = await userModel.find();
    return res.status(200).json({
      message: "users",
      data: finduser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
      error,
    });
  }
};

//get oneuser
export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    return res.status(200).json({
      message: "user gotten",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      error,
    });
  }
};

//update user
export const updateUser = async (req: Request, res: Response) => {
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
  } catch (error) {
    return res.status(500).json({
      message: "An error occured",
      error,
    });
  }
};

//delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "user successfully deleted",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured while deleting",
      error,
    });
  }
};
