import mongoose from "mongoose";
import { Product, ProductType } from "../models/Product";

export class Database {

    static async addProducts(products: ProductType[]) {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        Product.create(products, function(err: Error) {
            if (err) throw new Error("Error: " + err);
        });
    }
}