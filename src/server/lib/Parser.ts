import * as cheerio from "cheerio";
import { Category, Grocery } from "groceries-component";
import { BarboraGrocery, RimiGrocery } from "groceries-result";
import { parseCategory, parseCoopCategory } from "../../utils/parseData";

export class Parser {
    

    static async getBarboraItemsByCategory(category: Category): Promise<Grocery[]> {
        const resultProducts = [] as Grocery[];
        const resp = await fetch(`https://barbora.ee/${category.link}?page=0`);
        const $ = cheerio.load(await resp.text());
        const items = $('div[class="b-product--wrap clearfix b-product--js-hook   "]');
        for (let i = 0; i < items.length; i++) {
            const item = JSON.parse($(items[i]).attr("data-b-for-cart") ?? "") as BarboraGrocery;
            resultProducts.push({
                name: item.title,
                price: item.price,
                image: item.image,
                category: category.title
            });
        }
        return resultProducts;
    }

    static async getAllBarboraItems(): Promise<Grocery[]> {
        let itemsData = [] as Grocery[];
        for (let categoryIndex = 0; categoryIndex < 2; categoryIndex++) {
        // for (let categoryIndex = 0; categoryIndex < await this.getBarboraCategoriesCount(); categoryIndex++) {
            const category = await Parser.getBarboraCategoryById(categoryIndex);
            console.log(categoryIndex + " - barbora");
            if (!category.link) break;
            itemsData.push(...await this.getBarboraItemsByCategory(category));
        }
        return itemsData; 
    }
    
    static async getBarboraCategories() {
        const resp = await fetch('https://barbora.ee');
        const $ = cheerio.load(await resp.text());
        const categories = $('li[class="b-categories-root-category"]');
        const resultCategories = [] as any[];
        for (let i = 0; i < categories.length; i++) {
            const category = $(categories[i]).children("a");
            resultCategories.push({
                title: category.text(),
                path: i
            })
        }
        return resultCategories;
    }
    
    static async getBarboraCategoryById(id: number): Promise<Category> {
        const resp = await fetch('https://barbora.ee');
        const $ = cheerio.load(await resp.text());
        const categories = $('li[class="b-categories-root-category"]');
        const category = $(categories[id]).children("a");
        return {
            title: category.text(),
            link: category.attr("href")
        } as Category;
    }
    
    static async getBarboraCategoriesCount() {
        const resp = await fetch('https://barbora.ee');
        const $ = cheerio.load(await resp.text());
        const categories = $('li[class="b-categories-root-category"]');
        return categories.length;
    }
    
    static async getRimiItemsByCategory(category: Category): Promise<Grocery[]> {
        let page = 1;
        const resultProducts = [] as Grocery[];
        while (true) {
            const resp = await fetch(`https://rimi.ee${category.link}?page=${page}&pageSize=99`);
            const $ = cheerio.load(await resp.text());
            const items = $('li[class="product-grid__item"]');
            if (items.length == 0) break;
            for (let i = 0; i < items.length; i++) {
                const item = JSON.parse($(items[i]).children("div").attr("data-gtm-eec-product") ?? "") as RimiGrocery;
                const image = $(items[i]).children("div").children("div").children("div").children("img").attr("src");
                const euros = $(items[i]).children("div").children('div [class="card__details"]').children("div").children("div").children("div").children("span").text();
                const cents = $(items[i]).children("div").children('div [class="card__details"]').children("div").children("div").children("div").children("div").children("sup").text();
                resultProducts.push({
                    name: item.name,
                    price: Number(euros + "." + cents) ,
                    image: image ?? "",
                    category: item.category
                });
            }
            page++;
        }
        return resultProducts;
    }
    
    static async getRimiCategoryById(id: number) {
        const resp = await fetch('https://www.rimi.ee/epood/ee');
        const $ = cheerio.load(await resp.text());
        const titles = $('div[class="category-menu js-categories-level-container"] button[class="trigger gtm js-show-descendant-categories"]').children("span");
        const links = $('div[class="category-menu -second-level js-categories-level-container"] a[class="base-category-link trigger"]');
        const link = $(links.get(+id + 2)).attr("href");
        return {
            title: $(titles[+id + 2]).text(),
            path: id,
            link: link
        } as Category;
    }
    
    static async getRimiCategories() {
        const resp = await fetch('https://www.rimi.ee/epood/ee');
        const $ = cheerio.load(await resp.text());
        const titles = $('div[class="category-menu js-categories-level-container"] button[class="trigger gtm js-show-descendant-categories"]').children("span");
        const resultCategories = [] as any[];
        for (let i = 2; i < titles.length - 1; i++) {
            resultCategories.push({
                title: $(titles[i]).text(),
                path: i - 2,
            })
        }
        return resultCategories;
    }
    
    static async getRimiCategoriesCount() {
        const resp = await fetch('https://www.rimi.ee/epood/ee');
        const $ = cheerio.load(await resp.text());
        const titles = $('div[class="category-menu js-categories-level-container"] button[class="trigger gtm js-show-descendant-categories"]').children("span");
        return titles.length - 3;
    }

    static async getAllRimiItems(): Promise<Grocery[]> {
        let itemsData = [] as Grocery[];
        for (let categoryIndex = 0; categoryIndex < 2; categoryIndex++) {
        
        // for (let categoryIndex = 0; categoryIndex < await this.getRimiCategoriesCount(); categoryIndex++) {
            console.log(categoryIndex + " - rimi");
            const category = await Parser.getRimiCategoryById(categoryIndex);
            if (!category.link) break;
            itemsData.push(...await this.getRimiItemsByCategory(category));
        }
        //console.log(itemsData.length);
        return itemsData; 
    }
    
    static async getAllCoopItems() {
        let titles = ["1","6","20","30","39","47","53","69","78","81","93","109","113","10768","19014"] as string[];
        const items: Grocery[] = [];
        for (let i = 0; i < titles.length; i++) {
            let page = 1;
            while(true) {
                const response = await fetch(`https://api.vandra.ecoop.ee/supermarket/products?limit=100&category=${titles[i]}&language=et&page=${page}&orderby=popularity`);
                // const response = await fetch("https://api.vandra.ecoop.ee/supermarket/products");
                const coopData = (await response.json() as CoopData).data;
                if (coopData.length < 1) break;
                coopData.forEach((item) => {
                    items.push({
                        name: item.name,
                        price: Number(item.base_price) ,
                        image: item.image ?? "",
                        category: parseCoopCategory(titles[i]) ?? ""
                    });
                    console.log(parseCoopCategory(titles[i]));
                });
                page++;
            }
        }
        return items;
    }
}

interface CoopData {
  data: Product[];
  metadata: Metadata;
}

interface Metadata {
  category_name: string;
  category_description?: any;
  count: string;
  pages: number;
  characteristics: string[];
}

interface Product {
  id: number;
  id2: number;
  business?: any;
  business_name: string;
  ean?: any;
  name: string;
  slug: string;
  producer: string;
  image: string;
  thumbnail: string;
  vat_rate?: any;
  price: number;
  base_price: number;
  price_sale?: any;
  base_price_sale?: any;
  price_sale_mbr?: any;
  base_price_sale_mbr?: any;
  price_sale_mbr_plus?: any;
  base_price_sale_mbr_plus?: any;
  campaign_start?: any;
  campaign_end?: any;
  measurement_step: number;
  minimum_measurement_step?: any;
  quantity?: any;
  base_quantity: number;
  unit: string;
  base_unit: string;
  deleted_at?: any;
  deposit_count?: any;
  deposit_price?: any;
  favourited?: any;
  replaceable: boolean;
  can_call?: any;
  alcohol?: any;
  avg_weight: string;
}