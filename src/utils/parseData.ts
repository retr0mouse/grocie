import { Database } from "../server/middleware/Database";

export function parseCategory(categoryName: string) {
    let newName = categoryName.split("-") as string | string[]
    newName = newName[0] + "-" + newName[1]
    const categoryHash = new Map([
        ["SH-12", "Köögiviljad, puuviljad"],
        ["SH-11", "Piimatooted ja munad"],
        ["SH-6", "Leivad, saiad, kondiitritooted"],
        ["SH-8", "Liha, kala, valmistoit"],
        ["SH-16", "Liha, kala, valmistoit"],
        ["SH-13", "Kauasäilivad toidukaubad"],
        ["SH-4", "Külmutatud tooted"],
        ["SH-9", "Kauasäilivad toidukaubad"],
        ["SH-3", "Joogid"],
        ["SH-1", "Joogid"],
        ["SH-5", "Lastekaubad"],
        ["SH-2", "Enesehooldustooted"],
        ["SH-10", "Kodukaubad ja vaba aeg"],
        ["SH-7", "Puhastustarbed ja lemmikloomatooted"]
    ]);
    if (typeof categoryHash.get(newName) == "string"){
        return categoryHash.get(newName);  
    }
    else{
        return "Muu";
    }

    
}

export function isMessure(input: string) {
    const regex = /[0-9](l|ml|kg|g|mg)/i;
    return regex.test(input);
}

export function convertMessure(input: string) {
    const regex = /[0-9](l|ml|kg|g|mg)/i;
    if (regex.test(input)){
        let num = input.replace(/\D/g,'')
        let mes = input.replace(/\d+|^\s+|\s+$/g,'').replace(",","");

        if (num[0] == "0"){
          num = num.replace("0", "0.")
        }

        if (mes == "kg"){
        let result = Number(num) * 1000 + "g"
        return result}
        else if (mes == "l"){
        let result = Number(num) * 1000 + "ml"
        return result}
        else{
            return Number(num) + mes;
        }
    }
    else{
        return input;
    }
}

export async function createChart(productName: string){
  const product = Database.getProduct(productName)

  let dates:Date[] = []
  let minimum:number[] = []
  let avarage:number[] = []
  let maximum:number[] = []
  let stats = (await product).statistics

  if ( typeof stats !== "undefined"){
  for (let i = 0; i < stats.length; i++) {
    dates.push(stats[i].date)
    minimum.push(stats[i].min_price)
    avarage.push(stats[i].avg_price)
    maximum.push(stats[i].max_price)
  }
  }
  let data = {
    labels: dates,
    datasets: [
      {
        label: 'Minimaalne',
        data: minimum,
        borderColor: 'blue',
        fill: false,
        stepped: false,
      },
      {
        label: 'Keskmine',
        data: avarage,
        borderColor: "green",
        fill: false,
        stepped: false,
      },
      {
        label: 'Maksimaalne',
        data: maximum,
        borderColor: "red",
        fill: false,
        stepped: false,
      }
      
    ]
  };
  return data;
}