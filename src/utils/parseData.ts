import { Database } from "../server/middleware/Database";

export function translateCategory(categoryName: string): string {
	const categoryHash = new Map([
		["Köögiviljad, puuviljad", "Fruits and Vegetables"],
		["Piimatooted ja munad", "Milk and Eggs"],
		["Bread and pastries", "Bread and pastries"],
		["Liha, kala, valmistoit", "Meat, fish, ready food"],
		["Kauasäilivad toidukaubad", "Long-lasting food"],
		["Külmutatud tooted", "Frozen"],
		["Joogid", "Drinks"],
		["Lastekaubad", "Children's goods"],
		["Enesehooldustooted", "Self care"],
		["Kodukaubad ja vaba aeg", "Home goods and leisure"],
		["Puhastustarbed ja lemmikloomatooted", "Cleaning supplies and pet products"]
	]);
	return categoryHash.get(categoryName) ?? "Other";
}

export function parseCategory(categoryName: string): string {
	let newName = categoryName.split("-") as string | string[];
	newName = newName[0] + "-" + newName[1];
	const categoryHash = new Map([
		["SH-12", "Fruits and Vegetables"],
		["SH-11", "Milk and Eggs"],
		["SH-6", "Bread and pastries"],
		["SH-8", "Meat, fish, ready food"],
		["SH-16", "Meat, fish, ready food"],
		["SH-13", "Long-lasting food"],
		["SH-4", "Frozen"],
		["SH-9", "Long-lasting food"],
		["SH-3", "Drinks"],
		["SH-1", "Drinks"],
		["SH-5", "Children's goods"],
		["SH-2", "Self care"],
		["SH-10", "Home goods and leisure"],
		["SH-7", "Cleaning supplies and pet products"]
	]);
	return categoryHash.get(newName) ?? "Other";
}

export function parseCoopCategory(categoryName: string) {
	const categoryHash = new Map([
		["1", "Fruits and Vegetables"],
		["20", "Milk and Eggs"],
		["47", "Bread and pastries"],
		["6", "Meat, fish, ready food"],
		["30", "Long-lasting food"],
		["69", "Long-lasting food"],
		["53", "Drinks"],
		["78", "Children's goods"],
		["81", "Self care"],
		["93", "Home goods and leisure"],
		["109", "Cleaning supplies and pet products"]
	]);
	if (typeof categoryHash.get(categoryName) == "string") {
		return categoryHash.get(categoryName);
	}
	else {
		return "Other";
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
	const Drinks = [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 373, 374, 375, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 62]
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
		Drinks, 
		laste, 
		lemmiklooma,
		ennesehooldus, 
		majjapidamisega, 
		vabaaja, 
		hooaja
	];

	const names = [
		"Fruits and Vegetables", 
		"Meat, fish, ready food", 
		"Milk and Eggs", 
		"Milk and Eggs", 
		"Bread and pastries",
		"Meat, fish, ready food", 
		"Long-lasting food",
		"Long-lasting food",
		"Long-lasting food",
		"Long-lasting food",
		"Frozen",
		"Drinks",
		"Children's goods",
		"Cleaning supplies and pet products",
		"Self care",
		"Cleaning supplies and pet products",
		"Home goods and leisure",
		"Other"
	]
	for (let i = 0; i < categories.length; i++) {
		if (categories[i].includes(categoryId)) {
			return names[i];
		}
	}
	return "Other";
}

export function reverse(s: string){
    return s.split("").reverse().join("");
}

export function findMeasures(input: string): string | null {
	input = reverse(input.toLowerCase())
	let newword = ""
	let inputs = input.replace(",","_").replace(".","_").split(" ")
	const regex = new RegExp('[0-9]|g|k|l|m|_');
	const kilo = new RegExp('[0-9]kg');
	const litr = new RegExp('[0-9]l');
	for(let i=0; i <= inputs[0].length; i++){
		if(regex.test(inputs[0][i])){
			newword = newword + inputs[0][i]
		}
	}
	if(litr.test(reverse(newword))){
		return String(Number(reverse(newword).replace("_",".").slice(0, -1))*1000) + "ml" 
	}
	if(kilo.test(reverse(newword))){
		return String(Number(reverse(newword).replace("_",".").slice(0, -2))*1000) + "g" 
	}
	if (reverse(newword)?.replace("_",".").length == 0){
		return null
	}
	return reverse(newword)?.replace("_",".")
}

export async function createChart(productName: string) {
	const product = await Database.getProduct(productName)
	if (!product) return;

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
				label: 'Minimum',
				data: minimum,
				borderColor: 'blue',
				fill: false,
				stepped: false,
			},
			{
				label: 'Average',
				data: avarage,
				borderColor: "green",
				fill: false,
				stepped: false,
			},
			{
				label: 'Maximum',
				data: maximum,
				borderColor: "red",
				fill: false,
				stepped: false,
			}

		]
	};
	return data;
}