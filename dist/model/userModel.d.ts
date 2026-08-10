import mongoose from "mongoose";
interface user {
    name: string;
    email: string;
    password: string;
    role: string;
    enum: any[];
    default: any;
    products: {}[];
    verificationToken: string;
    verificationExpired: Date;
}
declare const userModel: mongoose.Model<user, {}, {}, {}, mongoose.Document<unknown, {}, user, {}, mongoose.DefaultSchemaOptions> & user & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, user>;
export default userModel;
//# sourceMappingURL=userModel.d.ts.map