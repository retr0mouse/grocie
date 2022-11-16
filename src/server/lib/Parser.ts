import * as cheerio from "cheerio";
import { Category, Grocery } from "groceries-component";
import { BarboraGrocery, RimiGrocery } from "groceries-result";

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
                id: item.id,
                category: category.title
            });
        }
        return resultProducts;
    }

    static async getAllBarboraItems(): Promise<Grocery[]> {
        let itemsData = [] as Grocery[];
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
                    id: item.id,
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
        //for (let categoryIndex = 0; categoryIndex < 1; categoryIndex++) {
        
        for (let categoryIndex = 0; categoryIndex < await this.getRimiCategoriesCount(); categoryIndex++) {
            console.log(categoryIndex + " - rimi");
            const category = await Parser.getRimiCategoryById(categoryIndex);
            if (!category.link) break;
            itemsData.push(...await this.getRimiItemsByCategory(category));
        }
        //console.log(itemsData.length);
        return itemsData; 
    }
}
