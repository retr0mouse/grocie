declare module "groceries-component" {
    interface Grocery {
        name: string,
        price: number,
        barbora_price?: number,
        rimi_price?: number,
        selver_price?: number,
        coop_price?: number,
        image: string,
        category: string,
        allPrices?: number[]
    }

    interface Category {
        title: string,
        link: string
    }
}
