import { Category, Grocery } from "groceries-component";
import mongoose from "mongoose";
import { parseCategory } from "../../utils/parseData";
import { Compare } from "../lib/Compare";
import { Parser } from "../lib/Parser";
import { Product, ProductType } from "../models/Product";

export class Database {

    static async addProducts(products: ProductType[]) {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        Product.create(products, function(err: Error) {
            if (err) throw new Error("Error: " + err);
        });
    }

    static async getProduct(productTitle: string): Promise<ProductType> {
        let foundProduct = {} as ProductType;
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        foundProduct = await Product.findOne({name: productTitle}).exec();
        return foundProduct;
    }

    static async getProductsContainingTitle(productTitle: string): Promise<ProductType[]> {
        let foundProduct = {} as ProductType [];
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        foundProduct = await Product.find({name: { "$regex": `${productTitle}`}}).exec();
        return foundProduct;
    }

    static async updateRimiProduct(newProduct: ProductType) {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        Product.updateOne({name: newProduct.name}, {rimi_price: newProduct.rimi_price}).exec();
    }

    static async updateBarboraProduct(newProduct: ProductType) {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        Product.updateOne({name: newProduct.name}, {barbora_price: newProduct.barbora_price}).exec();

    }
    static async getCategories(): Promise<Category[]> {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        const allCategories = await (Product.find().exec()) as Category[];
        return allCategories;
    }

    static async setStat(product:ProductType){
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);

        let prices: number[] = []
        if (typeof product.barbora_price  !== "undefined"){
            prices.push(product.barbora_price)
        }
        else if (typeof product.rimi_price  !== "undefined"){
            prices.push(product.rimi_price)
        }
        else if (typeof product.selver_price  !== "undefined"){
            prices.push(product.selver_price)
        }
        else if (typeof product.coop_price  !== "undefined"){
            prices.push(product.coop_price)
        }


        let MinimumPrice = Math.min.apply(null, prices);
        let avaragePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
        let MaximumPrice = Math.max.apply(null, prices);

        Product.updateOne({name: product.name}, { $push:{statistics: {
            date: new Date().toISOString().slice(0, 10),
            min_price: MinimumPrice,
            avg_price: avaragePrice,
            max_price: MaximumPrice
        }} });


    }
    
    static async updateBarboraItems() {
        const items = await Parser.getAllBarboraItems();
        items.forEach(async (item: Grocery) => {
            const newItem = {
                category: item.category.trim(),
                name: item.name.trim(),
                barbora_price: item.price,
                product_image: item.image
            } as ProductType;
            const commonTitle = await Compare.compareCommonItem(item.name);

            if (typeof commonTitle == 'string' && commonTitle.length > 1) {
                newItem.name = commonTitle
                //console.log(newItem.name)
                await this.updateBarboraProduct(newItem);
            }
            else {
                await this.addProducts([newItem]);
            }
        });
    }

    static async updateRimiItems() {
        const items = await Parser.getAllRimiItems();
        items.forEach(async (item: Grocery) => {
            const newCategory = parseCategory(item.category.trim());
            const commonTitle = await Compare.compareCommonItem(item.name);

            const newItem = {
                category: newCategory,
                name: item.name,
                rimi_price: item.price,
                product_image: item.image
            } as ProductType;

            if (typeof commonTitle == 'string' && commonTitle.length > 1) {
                newItem.name = commonTitle
                //console.log(newItem.name)
                await this.updateRimiProduct(newItem);
            }
            else {
                await this.addProducts([newItem]);
            }
        });
    }

    static async getProductsByCategory(categoryTitle: string): Promise<Grocery[]> {
        let foundProduct = {} as ProductType[];
        let itemsData = [] as Grocery[];
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        foundProduct = await Product.find({category: categoryTitle}).exec();
        for (let i = 0; i < foundProduct.length; i++) {
            const item = foundProduct[i] as ProductType;
            let prices: number[] = []
            if (typeof item.barbora_price  !== "undefined"){
                prices.push(item.barbora_price)
            }
            else if (typeof item.rimi_price  !== "undefined"){
                prices.push(item.rimi_price)
            }
            else if (typeof item.selver_price  !== "undefined"){
                prices.push(item.selver_price)
            }
            else if (typeof item.coop_price  !== "undefined"){
                prices.push(item.coop_price)
            }
            let MinimumPrice = Math.min.apply(null, prices);

            itemsData.push({
                name: item.name,
                price: MinimumPrice,
                image: item.product_image,
                category: item.category
            });
        }
        return itemsData;
    }
}

