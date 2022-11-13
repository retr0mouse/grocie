import { Database } from '../middleware/Database';

export class Compare{
    
    static async compareCommonItem(productTitle: string){
        const { compare } = require('string-compare');
        let fullTitleElem = productTitle.split(" ");
        let measure: string | undefined = fullTitleElem.pop()
        if (typeof measure === 'string') {
            measure = measure.toUpperCase();
        }
        let findTitle = ""
        if (fullTitleElem.length > 1){
        findTitle = fullTitleElem[0] + " " + fullTitleElem[1]
        }
        else{
        findTitle = fullTitleElem[0]
        }

        let compareTitles = (await Database.getProductsContainingTitle(findTitle));
        let comapeMeasure: string | undefined = fullTitleElem.pop()
        if (typeof comapeMeasure === 'string') {
            comapeMeasure = comapeMeasure.toUpperCase();
        }
        
        let maximum = 0
        let sameProduct = "" 
        compareTitles.forEach(element => {
            let comparison = compare(element.name.toLowerCase(), productTitle.toLocaleLowerCase())
            if (comparison > maximum){
                sameProduct = element.name
                maximum = comparison
            }
        });
        if (maximum > 0.72 && measure === comapeMeasure){
            return sameProduct
        }
    }
}