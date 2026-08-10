import {model, Schema, Document} from "mongoose";

interface products {
  productName : string;
  price : number;
  details : string;
  status : boolean;
  image : {
    url: string;
    public_id: string;
  };
  category : string;
}

interface Iproducts extends products, Document{}

const productSchema : Schema<Iproducts> = new Schema({
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
    public_id : String
  },

  category: {
    type: String,
    required: true,
  },

})

const productModel = model<products>("product", productSchema)
export default productModel