import { Category, Grocery } from "groceries-component";
import mongoose from "mongoose";
import { parseCategory, translateCategory } from "../../utils/parseData";
import { Compare } from "../lib/Compare";
import { Parser } from "../lib/Parser";
import { Product, ProductType } from "../models/Product";

export class Database {
    private static CATEGORIES_COUNT = 15;

    private static categoriesMapping = new Map([
        ["0", "Fruits and Vegetables"],                 // Fruits and Vegetables
        ["1", "Milk and Eggs"],                  // Milk and Eggs
        ["2", "Bread and pastries"],        // Bread and pastries
        ["3", "Meat, fish, ready food"],                // Meat, fish, ready food
        ["4", "Long-lasting food"],              // Long-lasting food
        ["5", "Frozen"],                     // Frozen
        ["6", "Drinks"],                                // Drinks
        ["7", "Self care"],                    // Self care
        ["8", "Cleaning supplies and pet products"],   // Cleaning supplies and pet products
        ["9", "Children's goods"],                           // Children's goods
        ["10", "Home goods and leisure"],               // Home goods and leisure
        ["11", "Other"]                                   // Other
    ])

    static getCategoriesCount() {
        return this.CATEGORIES_COUNT;
    }

    static getCategoryTitleById(id: string) {
        return this.categoriesMapping.get(id);
    }

    static async addProducts(products: ProductType[]) {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file");
        mongoose.connect(process.env.DATABASE_URL);
        try {
            Product.create(products);
        } catch (error) {
            console.log("error: " + error);
            return;
        }
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

    static async findTenSimilarItemsByTitle(title: string): Promise<Grocery[]> {
        let foundProduct = {} as ProductType [];
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        let itemsData: Grocery[] = [];
        foundProduct = await Product.find({name: { "$regex": `${title.toLowerCase()}`, '$options' : 'i'}}).limit(10).exec();
        for (let i = 0; i < foundProduct.length; i++) {
            const item = foundProduct[i] as ProductType;
            let prices: number[] = []
            const newItem = {
                name: item.name,
                category: item.category,
                image: item.product_image
            } as Grocery;

            if (typeof item.barbora_price  !== "undefined"){
                newItem.barbora_price = item.barbora_price;
                prices.push(item.barbora_price)
            }
            if (typeof item.rimi_price  !== "undefined"){
                newItem.rimi_price = item.rimi_price;
                prices.push(item.rimi_price)
            }
            if (typeof item.selver_price  !== "undefined"){
                newItem.selver_price = item.selver_price;
                prices.push(item.selver_price)
            }
            if (typeof item.coop_price  !== "undefined"){
                newItem.coop_price = item.coop_price;
                prices.push(item.coop_price)
            }
            // if (prices.length < 1) continue
            newItem.allPrices = prices;
            itemsData.push(newItem);
        }
        return itemsData;
    }

    static async updateRimiProduct(newProduct: ProductType) {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        Product.updateOne({name: newProduct.name}, {rimi_price: newProduct.rimi_price}).exec();
    }
    static async updateCoopProduct(newProduct: ProductType) {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        Product.updateOne({name: newProduct.name}, {coop_price: newProduct.coop_price}).exec();
    }
    static async updateSelverProduct(newProduct: ProductType) {
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);
        Product.updateOne({name: newProduct.name}, {selver_price: newProduct.selver_price}).exec();
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

    static async createStatsForEverything(){
        if (!process.env.DATABASE_URL) throw new Error("please specify your database in the .env file")
        mongoose.connect(process.env.DATABASE_URL);

        let allProducts = await Product.find().exec();

        for (let i=0; i < allProducts.length; i++){
            // console.log("item nr. " + i);
            let prices: number[] = []
            if (typeof allProducts[i].barbora_price  !== "undefined"){
                prices.push(allProducts[i].barbora_price)
            }
            if (typeof allProducts[i].rimi_price  !== "undefined"){
                prices.push(allProducts[i].rimi_price)
            }
            if (typeof allProducts[i].selver_price  !== "undefined"){
                prices.push(allProducts[i].selver_price)
            }
            if (typeof allProducts[i].coop_price  !== "undefined"){
                prices.push(allProducts[i].coop_price)
            }

            let MinimumPrice = Math.round(Math.min.apply(null, prices) * 100)/100;
            let averagePrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length * 100) / 100 ;
            let MaximumPrice = Math.round(Math.max.apply(null, prices) * 100) / 100;

            const newStat = {
                date: new Date().toLocaleDateString('en-GB'),
                min_price: MinimumPrice,
                avg_price: averagePrice,
                max_price: MaximumPrice
            }
            const product = await Product.findOne({name: allProducts[i].name});

            //console.log(product.name);
            product.statistics.push(newStat);

            await product.save();
        }
    }
    
    static async updateBarboraItems() {
        const items = await Parser.getAllBarboraItems();
        items.forEach(async (item: Grocery) => {
            const newItem = {
                category: translateCategory(item.category.trim()),
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
            const newCategory = parseCategory(item.category.trim()) ?? "";
            const commonTitle = await Compare.compareCommonItem(item.name);
            const newItem = {
                category: translateCategory(newCategory),
                name: item.name,
                rimi_price: item.price,
                product_image: item.image
            }; 

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

    static async updateCoopItems() {
        const items = await Parser.getAllCoopItems();
        items.forEach(async (item: Grocery) => {
            const commonTitle = await Compare.compareCommonItem(item.name);
            const newItem = {
                category: translateCategory(item.category),
                name: item.name,
                coop_price: item.price,
                product_image: item.image
            } as ProductType;

            if (typeof commonTitle == 'string' && commonTitle.length > 1) {
                newItem.name = commonTitle
                //console.log(newItem.name)
                await this.updateCoopProduct(newItem);
            }
            else {
                await this.addProducts([newItem]);
            }
        });
    }

    static async updateSelverItems() {
        const items = await Parser.getAllSelverItems();
        items.forEach(async (item: Grocery) => {
            const commonTitle = await Compare.compareCommonItem(item.name);
            const newItem = {
                category: translateCategory(item.category),
                name: item.name,
                selver_price: item.price,
                product_image: item.image
            } as ProductType;

            if (typeof commonTitle == 'string' && commonTitle.length > 1) {
                newItem.name = commonTitle
                await this.updateSelverProduct(newItem);
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
            const newItem = {
                name: item.name,
                category: item.category,
                image: item.product_image
            } as Grocery;

            if (typeof item.barbora_price  !== "undefined"){
                newItem.barbora_price = item.barbora_price;
                prices.push(item.barbora_price)
            }
            if (typeof item.rimi_price  !== "undefined"){
                newItem.rimi_price = item.rimi_price;
                prices.push(item.rimi_price)
            }
            if (typeof item.selver_price  !== "undefined"){
                newItem.selver_price = item.selver_price;
                prices.push(item.selver_price)
            }
            if (typeof item.coop_price  !== "undefined"){
                newItem.coop_price = item.coop_price;
                prices.push(item.coop_price)
            }
            if (prices.length < 2) continue
            newItem.allPrices = prices;
            itemsData.push(newItem);
        }
        return itemsData;
    }
}
