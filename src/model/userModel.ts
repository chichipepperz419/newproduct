import mongoose from "mongoose";

interface user {
  name: string;
  email: string;
  password: string;
  role: string;
  enum: any[];
  default: any;
  products: {}[];
   verificationToken : string;
  verificationExpired : Date 
}
interface iuser extends user, mongoose.Document {}

const userSchema = new mongoose.Schema<iuser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    enum: ["student", "lecturer", "admin"],
    default: {
      type: String,
    },
    
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
      },
    ],


  },
  { timestamps: true },
);

const userModel = mongoose.model<user>("user", userSchema);

export default userModel;