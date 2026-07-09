import { register, login, getUser , updateUser , deleteUser, profile, signup, signIn, viewAllStudents} from "../controller/userController.js";
import { Router } from "express";
import { createUserSchema, loginUserSchema } from "../validator/user.validator.js";
import { validateUser } from "../middlewares/validate.js";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { authorize } from "../middlewares/authorization.middlewares.js";



const userRouter = Router();

userRouter.post("/register", validateUser(createUserSchema), register);
userRouter.get("/login", validateUser(loginUserSchema), login);
userRouter.get("/profile" , authenticate , profile);
userRouter.get("/", getUser);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:id", authenticate, authorize("lecturer"), deleteUser);
userRouter.post("/signup", signup);
userRouter.post("/signin", validateUser(loginUserSchema), signIn);
userRouter.get("/students", authenticate, viewAllStudents);

export default userRouter;



//create a student and a lectureres platform where the students should be able to sign up, sign in, and view profile,
/** students should have the following schemas name, email, password, and role
 * lectures should be able to delete user, view all the students profile.
 * students should be able to view their own profile and update their profile.
 */