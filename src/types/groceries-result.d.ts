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

    // ------------ RIMI -----------------

    interface RimiGrocery {
        id: string;
        name: string;
        category: string;
        brand?: any;
        price: number;
        currency: string;
    }

    // ------------ COOP -----------------

    interface CoopGrocery {
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

    // ----------- SELVER ----------------

    interface SelverGrocery {
        took: number;
        timed_out: boolean;
        _shards: Shards;
        hits: Hits;
        aggregations: Aggregations;
    }

    interface Aggregations {
        agg_terms_product_country_of_origin_options: Aggtermsproductcountryoforiginoptions;
        agg_terms_product_brand: Aggtermsproductbrand;
        agg_terms_variant_size_options: Aggtermsproductcountryoforiginoptions;
        agg_terms_allowed_for_parcel: Aggtermsproductcountryoforiginoptions;
        agg_range_price: Aggrangeprice;
        agg_terms_product_main_ecategory: Aggtermsproductbrand;
        agg_terms_product_main_ecategory_options: Aggtermsproductcountryoforiginoptions;
        agg_terms_allowed_for_parcel_options: Aggtermsproductcountryoforiginoptions;
        agg_terms_product_manufacturer: Aggtermsproductbrand;
        agg_terms_product_country_of_origin: Aggtermsproductbrand;
        agg_terms_variant_size: Aggtermsproductcountryoforiginoptions;
        agg_terms_price: Aggtermsproductbrand;
        agg_terms_product_dietary_info: Aggtermsproductbrand;
        agg_terms_product_brand_options: Aggtermsproductcountryoforiginoptions;
        agg_terms_product_segment: Aggtermsproductbrand;
        agg_terms_product_manufacturer_options: Aggtermsproductcountryoforiginoptions;
        agg_terms_product_dietary_info_options: Aggtermsproductcountryoforiginoptions;
        agg_terms_product_segment_options: Aggtermsproductcountryoforiginoptions;
    }

    interface Aggrangeprice {
        buckets: Bucket2[];
    }

    interface Bucket2 {
        key: string;
        from: number;
        to?: number;
        doc_count: number;
    }

    interface Aggtermsproductbrand {
        doc_count_error_upper_bound: number;
        sum_other_doc_count: number;
        buckets: Bucket[];
    }

    interface Bucket {
        key: number;
        doc_count: number;
    }

    interface Aggtermsproductcountryoforiginoptions {
        doc_count_error_upper_bound: number;
        sum_other_doc_count: number;
        buckets: any[];
    }

    interface Hits {
        total: Total;
        max_score?: any;
        hits: Hit[];
    }

    interface Hit {
        _index: string;
        _type: string;
        _id: string;
        _score?: any;
        _source: Source;
        sort: number[];
    }

    interface Source {
        image: string;
        final_price: number;
        name: string;
        id: string;
        category: Category[];
        original_price?: any;
        original_price_tax?: any;
        original_price_incl_tax?: any;
        original_final_price: number;
        price?: any;
        price_tax: number;
        price_incl_tax?: any;
        final_price_tax: number;
        final_price_incl_tax: number;
        special_price: number;
        special_price_tax: number;
        special_price_incl_tax: number;
    }

    interface Category {
        is_virtual: boolean | string;
        category_id: number;
        name: string;
        position: number;
    }

    interface Total {
        value: number;
        relation: string;
    }

    interface Shards {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    }
}

