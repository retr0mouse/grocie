import * as cheerio from "cheerio";
import { Category } from "groceries-component";
import { BarboraGrocery, CoopGrocery, RimiGrocery, SelverGrocery } from "groceries-result";
import { parseCategory, parseCoopCategory, parseSelverCategory } from "../../utils/parseData";
import {GroceryFromDB} from "../models/Product";

export class Parser {
    

    static async getBarboraItemsByCategory(category: Category): Promise<GroceryFromDB[]> {
        const resultProducts = [] as GroceryFromDB[];
        const resp = await fetch(`https://barbora.ee/${category.link}?page=0`);
        const $ = cheerio.load(await resp.text());
        const items = $('div[class="b-product--wrap clearfix b-product--js-hook   "]');
        for (let i = 0; i < items.length; i++) {
            const item = JSON.parse($(items[i]).attr("data-b-for-cart") ?? "") as BarboraGrocery;
            resultProducts.push({
                name: item.title,
                barbora_price: Math.round(item.price * 100) / 100,
                product_image: item.image,
                category: category.title
            });
        }
        return resultProducts;
    }

    static async getAllBarboraItems(): Promise<GroceryFromDB[]> {
        let itemsData = [] as GroceryFromDB[];
        //for (let categoryIndex = 0; categoryIndex < 2; categoryIndex++) {
        for (let categoryIndex = 0; categoryIndex < await this.getBarboraCategoriesCount(); categoryIndex++) {
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
    
    static async getRimiItemsByCategory(category: Category): Promise<GroceryFromDB[]> {
        let page = 1;
        const resultProducts = [] as GroceryFromDB[];
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
                    rimi_price: Math.round(Number(euros + "." + cents) * 100) / 100 ,
                    product_image: image ?? "",
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

    static async getAllRimiItems(): Promise<GroceryFromDB[]> {
        let itemsData = [] as GroceryFromDB[];
        //for (let categoryIndex = 0; categoryIndex < 2; categoryIndex++) {
        
        for (let categoryIndex = 0; categoryIndex < await this.getRimiCategoriesCount(); categoryIndex++) {
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
        const items: GroceryFromDB[] = [];
        for (let i = 0; i < titles.length; i++) {
            let page = 1;
            while(true) {
                const response = await fetch(`https://api.vandra.ecoop.ee/supermarket/products?limit=100&category=${titles[i]}&language=et&page=${page}&orderby=popularity`);
                // const response = await fetch("https://api.vandra.ecoop.ee/supermarket/products");
                const coopData = (await response.json() as CoopGrocery).data;
                if (coopData.length < 1) break;
                coopData.forEach((item) => {
                    items.push({
                        name: item.name,
                        coop_price: Math.round(Number(item.price) * 100) / 100,
                        product_image: item.image ?? "",
                        category: parseCoopCategory(titles[i]) ?? ""
                    });
                    //console.log(parseCoopCategory(titles[i]));
                });
                page++;
            }
        console.log("Coop - " + i)
        }
        return items;
    }

    static async getAllSelverItems() {
        const items: GroceryFromDB[] = [];
        const size = 100;
        let from = 0;
        while(true) {
            const response = await fetch(`https://www.selver.ee/api/catalog/vue_storefront_catalog_et/product/_search?_source_exclude=configurable_options%2Cproduct_nutr_%2A%2Csgn%2C%2A.sgn%2Cmsrp_display_actual_price_type%2C%2A.msrp_display_actual_price_type%2Crequired_options&_source_include=final_price,id,image,name,category&from=${from}&request=%7B%22query%22%3A%7B%22bool%22%3A%7B%22filter%22%3A%7B%22bool%22%3A%7B%22must%22%3A%5B%7B%22terms%22%3A%7B%22visibility%22%3A%5B2%2C3%2C4%5D%7D%7D%2C%7B%22terms%22%3A%7B%22status%22%3A%5B0%2C1%5D%7D%7D%2C%7B%22terms%22%3A%7B%22category_ids%22%3A%5B209%2C210%2C212%2C213%2C214%2C215%2C216%2C217%2C369%5D%7D%7D%5D%7D%7D%7D%7D%2C%22aggs%22%3A%7B%22agg_terms_price%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22price%22%7D%7D%2C%22agg_range_price%22%3A%7B%22range%22%3A%7B%22field%22%3A%22price%22%2C%22ranges%22%3A%5B%7B%22from%22%3A0%2C%22to%22%3A1%7D%2C%7B%22from%22%3A1%2C%22to%22%3A2%7D%2C%7B%22from%22%3A2%2C%22to%22%3A3%7D%2C%7B%22from%22%3A3%2C%22to%22%3A4%7D%2C%7B%22from%22%3A4%2C%22to%22%3A5%7D%2C%7B%22from%22%3A5%2C%22to%22%3A6%7D%2C%7B%22from%22%3A6%2C%22to%22%3A7%7D%2C%7B%22from%22%3A7%2C%22to%22%3A8%7D%2C%7B%22from%22%3A8%2C%22to%22%3A9%7D%2C%7B%22from%22%3A9%2C%22to%22%3A10%7D%2C%7B%22from%22%3A10%2C%22to%22%3A20%7D%2C%7B%22from%22%3A20%2C%22to%22%3A30%7D%2C%7B%22from%22%3A30%2C%22to%22%3A40%7D%2C%7B%22from%22%3A40%2C%22to%22%3A50%7D%2C%7B%22from%22%3A50%2C%22to%22%3A100%7D%2C%7B%22from%22%3A100%2C%22to%22%3A150%7D%2C%7B%22from%22%3A150%2C%22to%22%3A300%7D%2C%7B%22from%22%3A300%2C%22to%22%3A500%7D%2C%7B%22from%22%3A500%7D%5D%7D%7D%2C%22agg_terms_product_country_of_origin%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22product_country_of_origin%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_product_country_of_origin_options%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22product_country_of_origin_options%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_product_dietary_info%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22product_dietary_info%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_product_dietary_info_options%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22product_dietary_info_options%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_variant_size%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22variant_size%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_variant_size_options%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22variant_size_options%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_allowed_for_parcel%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22allowed_for_parcel%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_allowed_for_parcel_options%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22allowed_for_parcel_options%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_product_main_ecategory%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22product_main_ecategory%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_product_main_ecategory_options%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22product_main_ecategory_options%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_product_manufacturer%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22product_manufacturer%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_product_manufacturer_options%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22product_manufacturer_options%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_product_segment%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22product_segment%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_product_segment_options%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22product_segment_options%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_product_brand%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22product_brand%22%2C%22size%22%3A100%7D%7D%2C%22agg_terms_product_brand_options%22%3A%7B%22terms%22%3A%7B%22field%22%3A%22product_brand_options%22%2C%22size%22%3A100%7D%7D%7D%2C%22sort%22%3A%5B%7B%22category.position%22%3A%7B%22order%22%3A%22asc%22%2C%22mode%22%3A%22min%22%2C%22nested_path%22%3A%22category%22%2C%22nested_filter%22%3A%7B%22term%22%3A%7B%22category.category_id%22%3A209%7D%7D%7D%7D%5D%7D&size=${size}&sort=position%3Aasc`);
            const selverItems = (await response.json() as SelverGrocery).hits.hits;
            if (selverItems.length < 1) break;
            selverItems.forEach(item => {
                items.push({
                    name: item._source.name,
                    selver_price: Math.round(item._source.final_price * 100) / 100,
                    product_image: "https://www.selver.ee/img/800/800/resize/" + item._source.image,
                    category: parseSelverCategory(item._source.category[0].category_id)
                })
            });
            from += selverItems.length;
        }
        return items;
    } 
}

