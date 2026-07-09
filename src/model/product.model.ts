import {model, Schema, Document} from "mongoose";

interface products {
  productName : string;
  price : number;
  details : string;
  status : string;
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
    type: String,
    required: true,
  },
  image: {
    type : String,
    required : true,
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