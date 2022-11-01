import * as cheerio from "cheerio";
import { Grocery } from "groceries-component";
import { BarboraGrocery, RimiGrocery } from "groceries-result";

export async function getBarboraItemsByUrl(url: string): Promise<Grocery[]> {
    const resp = await fetch(url);
    const $ = cheerio.load(await resp.text());
    const items = $('div[class="b-product--wrap clearfix b-product--js-hook   "]');
    const resultProducts = [] as Grocery[];
    for (let i = 0; i < items.length; i++) {
        const item = JSON.parse($(items[i]).attr("data-b-for-cart") ?? "") as BarboraGrocery;
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

export async function getRimiItemsByUrl(url: string): Promise<Grocery[]> {
    const resp = await fetch(`${url}`);
    const $ = cheerio.load(await resp.text());
    const items = $('li[class="product-grid__item"]');
    const resultProducts = [] as Grocery[];
    for (let i = 0; i < items.length; i++) {
        const item = JSON.parse($(items[i]).children("div").attr("data-gtm-eec-product") ?? "") as RimiGrocery;
        const image = $(items[i]).children("div").children("div").children("div").children("img").attr("src");
        resultProducts.push({
            name: item.name,
            price: item.price.toString(),
            image: image ?? "",
            id: item.id
        });
    }
    return resultProducts;
}

export async function getRimiCategoryById(id: number) {
    const resp = await fetch('https://www.rimi.ee/epood/ee');
    const $ = cheerio.load(await resp.text());
    const titles = $('div[class="category-menu js-categories-level-container"] button[class="trigger gtm js-show-descendant-categories"]').children("span");
    const links = $('div[class="category-menu -second-level js-categories-level-container"] a[class="base-category-link trigger"]');
    const link = $(links.get(+id + 2)).attr("href");
    return {
        title: $(titles[+id + 2]).text(),
        path: id,
        link: link
    }
}

export async function getRimiCategories() {
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

export async function getRimiCategoriesCount() {
    const resp = await fetch('https://www.rimi.ee/epood/ee');
    const $ = cheerio.load(await resp.text());
    const titles = $('div[class="category-menu js-categories-level-container"] button[class="trigger gtm js-show-descendant-categories"]').children("span");
    return titles.length - 3;
}