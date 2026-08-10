import { Document } from "mongoose";
interface products {
    productName: string;
    price: number;
    details: string;
    status: boolean;
    image: {
        url: string;
        public_id: string;
    };
    category: string;
}
declare const productModel: import("mongoose").Model<products, {}, {}, {}, Document<unknown, {}, products, {}, import("mongoose").DefaultSchemaOptions> & products & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, products>;
export default productModel;
//# sourceMappingURL=product.model.d.ts.map