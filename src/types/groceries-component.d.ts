declare module "groceries-component" {
    interface Grocery {
        name: string,
        price: number,
        image: string,
        category: string
    }

    interface Category {
        title: string,
        link: string
    }
}
