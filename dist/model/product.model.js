import { model, Schema, Document } from "mongoose";
const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    image: {
        url: String,
        public_id: String
    },
    category: {
        type: String,
        required: true,
    },
});
const productModel = model("product", productSchema);
export default productModel;
//# sourceMappingURL=product.model.js.map