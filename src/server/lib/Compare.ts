import { convertMessure, isMessure } from '../../utils/parseCategory';
import { Database } from '../middleware/Database';
import { ProductType } from '../models/Product';


export class Compare{
    static async compareCommonItem(productTitle: string): Promise<string | undefined> {
        //console.log("----------- " + productTitle + "------------");
        const stringSimilarity = require("string-similarity");
        const fullTitleElem = productTitle.split(" ");
        let measure : string | undefined;
        if (fullTitleElem.length > 1) {
            fullTitleElem.forEach(element => {
                if (isMessure(element)){
                    measure = element
                }
                else if (element === "kg"){
                    measure = element
                }
            });
            //console.log(measure)
        }
        if (typeof measure === 'string') {
            measure = measure.toLowerCase().replace(" ","");
        }
        const findTitle = fullTitleElem[0];
        let compareTitles: string[] | ProductType[] = (await Database.getProductsContainingTitle(findTitle));
        let titles = compareTitles.map(x => x.name);
        compareTitles = compareTitles.map(x => x.name.toLowerCase());
        for (let i = 0; i < compareTitles.length; i++) {
            const comparison = stringSimilarity.findBestMatch(productTitle.toLowerCase(), compareTitles);
            if (comparison.bestMatch.rating > 0.71) {
                let comapeMeasureFindArray: string[] | undefined  = comparison.bestMatch.target.split(" ");
                let comapeMeasure : string | undefined;
                if (typeof comapeMeasureFindArray !== "undefined" && comapeMeasureFindArray.length > 1) {
                    comapeMeasureFindArray.forEach(element => {
                        if (isMessure(element)){
                            comapeMeasure = element
                        }
                        else if (element === "kg"){
                            comapeMeasure = element
                        }
                    });
                }

                if (typeof comapeMeasure !== "undefined" && typeof measure !== "undefined") {
                    comapeMeasure === comapeMeasure.toLowerCase().replace(" ","")
                    // console.log (convertMessure(measure) + " -  " + (convertMessure(comapeMeasure))) +  "!"
                }

                if (typeof comapeMeasure !== "undefined" && typeof measure !== "undefined" && convertMessure(measure).search(convertMessure(comapeMeasure)) > -1){
                    //console.log(titles[comparison.bestMatchIndex])

                    return titles[comparison.bestMatchIndex]
                }
                else {
                    console.log("try: " + comparison.bestMatch.target + " needed: " + productTitle);
                    compareTitles.splice(comparison.bestMatchIndex, 1);
                }
            }
            else{
                return;
            }
        }
   }
}
