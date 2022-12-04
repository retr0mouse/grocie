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

export function parseSelverCategory(categoryId: number): string {
	const puuJaKoog = [209, 210, 212, 213, 214, 215, 216, 217, 369]
	const lihaJaKala = [218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231]
	const piimatooted = [233, 234, 235, 236, 237, 238, 239, 240]
	const juust = [242, 243, 244, 245, 246]
	const leivad = [247, 248, 249, 250, 251, 252, 253, 254, 255]
	const valmistoit = [256, 257, 258, 260, 261]
	const kuivained = [8, 18, 19, 20, 21, 22, 23, 24, 25, 26, 9, 10, 11, 12, 13, 14, 15, 16, 17]
	const maitseaned = [262, 263, 264, 265]
	const kastmed = [266, 267, 268, 269, 270]
	const maiustused = [271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283]
	const külmatatud = [284, 285, 286, 287, 288, 289]
	const joogid = [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 373, 374, 375, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 62]
	const laste = [306, 307, 308, 309, 310, 313]
	const lemmiklooma = [314, 315, 316, 317, 318, 319]
	const ennesehooldus = [63, 64, 65, 66, 68, 69, 70, 71, 425, 72, 73, 74, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
	const majjapidamisega = [100, 101, 102, 103, 104, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 141, 142, 143, 144, 146, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165]
	const vabaaja = [166, 167, 168, 169, 170, 171, 172, 173, 381, 174, 175, 176, 177, 179, 180, 181, 183, 184, 185, 186, 187, 188, 189, 190, 191, 194, 195, 197, 198, 199, 200, 201, 202, 203, 204, 205, 387, 206, 207, 208]
	const hooaja = [322, 323, 324, 325, 327, 328, 329, 330, 331, 332, 333, 334];

	const categories = [
		puuJaKoog, 
		lihaJaKala, 
		piimatooted, 
		juust,
		leivad, 
		valmistoit, 
		kuivained, 
		maitseaned, 
		kastmed, 
		maiustused, 
		külmatatud, 
		joogid, 
		laste, 
		lemmiklooma,
		ennesehooldus, 
		majjapidamisega, 
		vabaaja, 
		hooaja
	];

	const names = [
		"Köögiviljad, puuviljad", 
		"Liha, kala, valmistoit", 
		"Piimatooted ja munad", 
		"Piimatooted ja munad", 
		"Leivad, saiad, kondiitritooted",
		"Liha, kala, valmistoit", 
		"Kauasäilivad toidukaubad",
		"Kauasäilivad toidukaubad",
		"Kauasäilivad toidukaubad",
		"Kauasäilivad toidukaubad",
		"Külmutatud tooted",
		"Joogid",
		"Lastekaubad",
		"Puhastustarbed ja lemmikloomatooted",
		"Enesehooldustooted",
		"Puhastustarbed ja lemmikloomatooted",
		"Kodukaubad ja vaba aeg",
		"Muu"
	]
	for (let i = 0; i < categories.length; i++) {
		if (categories[i].includes(categoryId)) {
			return names[i];
		}
	}
	return "Muu";
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