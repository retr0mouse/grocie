import { Database } from "../server/middleware/Database";

export function parseCategory(categoryName: string) {
	let newName = categoryName.split("-") as string | string[];
	newName = newName[0] + "-" + newName[1];
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
	if (typeof categoryHash.get(newName) == "string") {
		return categoryHash.get(newName);
	}
	else {
		return "Muu";
	}


}

export function parseCoopCategory(categoryName: string) {
	const categoryHash = new Map([
		["1", "Köögiviljad, puuviljad"],
		["20", "Piimatooted ja munad"],
		["47", "Leivad, saiad, kondiitritooted"],
		["6", "Liha, kala, valmistoit"],
		["30", "Kauasäilivad toidukaubad"],
		["69", "Kauasäilivad toidukaubad"],
		["53", "Joogid"],
		["78", "Lastekaubad"],
		["81", "Enesehooldustooted"],
		["93", "Kodukaubad ja vaba aeg"],
		["109", "Puhastustarbed ja lemmikloomatooted"]
	]);
	if (typeof categoryHash.get(categoryName) == "string") {
		return categoryHash.get(categoryName);
	}
	else {
		return "Muu";
	}

}

export function isMeasure(input: string) {
	// const regex = /[0-9](l|ml|kg|g|mg)/i;
	input = input.toLowerCase()
	const regex = new RegExp('[0-9]l|ml|kg|g|mg|tk');
	return regex.test(input);
}

export function findMeasure(input: string): string | null {
	const testString = input.replace(/ /g, '').replace(",", ".");    // remove whitespaces and replace commas with dots
	const regex = new RegExp('(\d+(?:\.\d+)?)\s?(millilitre|milliliter|ml|litre|liter|l|kilogram|kg|gram|g)\b');
	if (regex.test(testString)) return testString.match(regex)?.at(0) ?? null;
	return null;
}

export function convertMeasure(input: string): string | null {
	const measures = new Map([								// we transform kg into g and l into ml
		["l", "ml"],
		["kg", "g"]
	]);
	const regex = new RegExp('(\d+(?:\.\d+)?)\s?(millilitre|milliliter|ml|litre|liter|l|kilogram|kg|gram|g)\b');           
	let stringToConvert = input.replace(/ /g, '').replace('.', ',');   		// 100 g ==> 100g ; 1,5 kg ==> 1.5kg ==> 1500g
	let matchedPart: string;
	if (regex.test(stringToConvert)) {
		matchedPart = stringToConvert.match(regex)?.at(0) ?? "";
	} else {
		return null;
	}
	const parts = [matchedPart.match(/\d+/)?.at(0) ?? "", matchedPart.replace(/[0-9]/g, '')];
	let numericPart = "";
	let stringPart = "";
	if (parts[0].length > 0) {
		numericPart = (-parts[0] * 1000).toString();
	} else {
		numericPart = "1";
	}
	if (parts[1].length > 0) {
		stringPart = measures.get(parts[1]) ?? "";
	}
	if (numericPart.length > 0 && stringPart.length > 0) return numericPart + stringPart;
	else return null
}

export async function createChart(productName: string) {
	const product = await Database.getProduct(productName)

	let dates: string[] = []
	let minimum: number[] = []
	let avarage: number[] = []
	let maximum: number[] = []
	let stats = product.statistics

	if (typeof stats !== "undefined") {
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