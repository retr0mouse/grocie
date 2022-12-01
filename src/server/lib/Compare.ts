import { findMeasure, convertMeasure } from '../../utils/parseData';
import { Database } from '../middleware/Database';
import { ProductType } from '../models/Product';


// find all items that have a match in db : {rimi_price: { $not: { $eq: null } }, rimi_price: { $not: { $eq: null } }}
export class Compare{
    //      return a string with title if found similar item
    // VVVV return nothing, if the title has never appeared before VVVV
    static async compareCommonItem(productTitle: string): Promise<string | undefined> { 
        const stringSimilarity = require("string-similarity");
        const title = productTitle.split(" ")[0];
        let productsToCompare: string[] | ProductType[] = (await Database.getProductsContainingTitle(title));
        let titles = productsToCompare.map(x => x.name);
        productsToCompare = productsToCompare.map(x => x.name.toLowerCase());
        let initialMeasure = findMeasure(productTitle);
        if (initialMeasure === null) {
            if (productsToCompare.length > 0) {
                const similarItems = stringSimilarity.findBestMatch(productTitle.toLowerCase(), productsToCompare);
                if (similarItems.bestMatch.rating > 0.71) {
                    return titles[similarItems.bestMatchIndex];
                } else {
                    return;
                }
            }
        } else {
            initialMeasure = convertMeasure(initialMeasure) ?? initialMeasure;
        }

		// case when item has a measure
        for (let i = 0; i < productsToCompare.length; i++) {
            const similarItems = stringSimilarity.findBestMatch(productTitle.toLowerCase(), productsToCompare);
            if (similarItems.bestMatch.rating > 0.71) {
                const bestMatch = similarItems.bestMatch.target;
                let measureToCompare = findMeasure(bestMatch);
                if (measureToCompare === null) {
                    console.log("ALLEGEDLY NO MEASURE: " + similarItems.bestMatch.target);
					continue;
                } else {
					console.log("NON CONVERTED MEASURE: " + measureToCompare + " " + bestMatch);
                    measureToCompare = convertMeasure(measureToCompare) ?? measureToCompare;
					console.log("CONVERTED MEASURE: " + measureToCompare + " " + bestMatch);
                    if (initialMeasure === measureToCompare) {
                        return titles[similarItems.bestMatchIndex];
                    } else {
                        // console.log(`
						// 	huinya: ${similarItems.bestMatch.target} nuzno bili naiti ${productTitle}
						// 			${measureToCompare} 								  ${initialMeasure}
						// `);
                        productsToCompare.splice(similarItems.bestMatchIndex, 1);
                    }
                }
            }
            else{
                return;
            }
        }
   }
}
