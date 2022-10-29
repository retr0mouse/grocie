import * as cheerio from "cheerio";
import { Grocery } from "groceries-component";

export async function getBarboraItemsByUrl(url: string): Promise<Grocery[]> {
    const resp = await fetch(url);
    const $ = cheerio.load(await resp.text());
    const items = $('div[class="b-product--wrap clearfix b-product--js-hook   "]');
    const resultProducts = [] as Grocery[];
    for (let i = 0; i < items.length; i++) {
        const item = JSON.parse($(items[i]).attr("data-b-for-cart") ?? "") as any;
        resultProducts.push({
            name: item.title,
            price: item.price.toString(),
            image: item.image,
            id: item.id
        });
    }
    return resultProducts;
}

export async function getBarboraCategories() {
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

export async function getBarboraCategoriesById(id: number) {
    const resp = await fetch('https://barbora.ee');
    const $ = cheerio.load(await resp.text());
    const categories = $('li[class="b-categories-root-category"]');
    const category = $(categories[id]).children("a");
    return {
        title: category.text(),
        link: category.attr("href")
    };
}

export async function getBarboraCategoriesCount() {
    const resp = await fetch('https://barbora.ee');
    const $ = cheerio.load(await resp.text());
    const categories = $('li[class="b-categories-root-category"]');
    return categories.length;
}
