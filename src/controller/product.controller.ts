import type {Request, Response, NextFunction} from 'express';
import productModel from '../model/product.model.js';
import AppError from '../utils/AppError.js';
import cloudinary from '../configuration/cloudinary.js';
import fs from 'fs';
import { error } from 'console';
import e from 'express';

export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { productName, price, details, status, image, category } = req.body;

        if(!req.file){
            throw new AppError("image is required", 400);
        }
        const result = await cloudinary.uploader.upload(req.file.path);

        const product = await productModel.create({
            productName,
            price,
            details,
            status,
            image: {
                url: result.secure_url,
                public_id: result.public_id
            }, 
            category,
        });

        //fs.unlinkSync(req.file.path);
        return res.status(201).json({
            message: "product created successfully",
            data: product,
        });

    } catch (error) {
        next(error);
    }
}

export const getOneProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
)=> {
    try {
        const { productId } = req.params;
        const product = await productModel.findById(productId);

        if(!product) {
            throw new AppError("product not found", 404)
        }
        return res.status(200).json({
            message: "product gotten",
            data: product,
        })
    }catch (error){
        next (error)
    }

}


export const getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try { 
        const product = await productModel.find
        return res.status(200).json({
            message:"all products are gotten",
            data: product,
        })
    }catch(error){
        return res.status(500).json({
            message: "error getiing all products",
            error,
        })
    }
}


export const updatedProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try { 
        const { id } = req.params
        const updateProduct =  await productModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if(!updateProduct){
            throw new AppError ("product not found", 404)

        }
        return res.status(200).json({
            message: "product updated successfull",
            data: updateProduct
        })
        
    }catch(error){
        next(error)
    }
}