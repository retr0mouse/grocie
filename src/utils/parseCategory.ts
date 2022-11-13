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