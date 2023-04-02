import { findMeasures } from '../../utils/parseData';
import { Database } from '../middleware/Database';
import { GroceryFromDB } from '../models/Product';


// find all items that have a match in db : {rimi_price: { $not: { $eq: null } }, barbora_price: { $not: { $eq: null } }}
export class Compare{
    //      return a string with title if found similar item
    // VVVV return nothing, if the title has never appeared before VVVV
    static async compareCommonItem(productTitle: string): Promise<string | undefined> { 
        const stringSimilarity = require("string-similarity");
        const title = productTitle.split(" ")[0];
        let productsToCompare: string[] | GroceryFromDB[] = (await Database.getProductsContainingTitle(title));
        let titles = productsToCompare.map(x => x.name);
        productsToCompare = productsToCompare.map(x => x.name.toLowerCase());
        let initialMeasure = findMeasures(productTitle);


        for (let i = 0; i < productsToCompare.length; i++) {
            const similarItems = stringSimilarity.findBestMatch(productTitle.toLowerCase(), productsToCompare);
            if (similarItems.bestMatch.rating > 0.71) {
                const bestMatch = similarItems.bestMatch.target;
                let measureToCompare = findMeasures(bestMatch);
                if (measureToCompare == null && initialMeasure == null) {
                    return titles[similarItems.bestMatchIndex];
                } 
                else{
                    productsToCompare.splice(similarItems.bestMatchIndex, 1);
                }
                if (measureToCompare !== null && initialMeasure !== null)
                    if (initialMeasure === measureToCompare) {
                        return titles[similarItems.bestMatchIndex];
                    } else {
                        productsToCompare.splice(similarItems.bestMatchIndex, 1);
                    }
                }
            else{
                return;
            }
        }
   }
}
