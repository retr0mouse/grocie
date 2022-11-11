import mongoose from 'mongoose';

const Schema = mongoose.Schema; 
 
export interface ProductType {
  category: string,
  name: string,
  rimi_price?: number
  barbora_price?: number
  selver_price?: number
  coop_price?: number
  statistics?: {
    date: Date,
    min_price: number,
    avg_price: number,
    max_price: number
  }[]
}

const ProductSchema = new Schema<ProductType>({
  category: {type: String, required: true},
  name: {type: String, required: true},
  rimi_price: {type: Schema.Types.Number},
  barbora_price: {type:Schema.Types.Number},
  selver_price:{type: Schema.Types.Number},
  coop_price:{type: Schema.Types.Number},
  statistics: [{
    date: {type: Date},
    min_price: {type: Schema.Types.Number},
    avg_price: {type: Schema.Types.Number},
    max_price: {type: Schema.Types.Number}
  }]
});

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
