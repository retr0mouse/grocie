declare module "groceries-result" {
    interface BarboraGrocery {
        id: string;
        product_position_in_list: number;
        title: string;
        category_id: string;
        category_name_full_path: string;
        root_category_id: string;
        brand_name: string;
        price: number;
        image: string;
        comparative_unit: string;
        comparative_unit_price: number;
        status: string;
        popUpText?: any;
        age_limitation?: any;
        picking_actions: any[];
        list: string;
        sectionTitle?: any;
        quantity: number;
    }

    interface RimiGrocery {
        id: string;
        name: string;
        category: string;
        brand?: any;
        price: number;
        currency: string;
    }
}

