import { Parser } from "../../../server/lib/Parser";

export default function Category({ itemsData, title }: any) {
    return (
        <div>
            <h1 className="w-fit relative left-[50%] translate-x-[-50%] mt-5 font-sans text-5xl font-bold">{title}</h1>
            <div className="m-10 flex flex-wrap content-between">
                {itemsData?.map((item: any, key: number) => {
                    return(
                        <div key={key} className='w-[200px] m-2 bg-slate-50 p-3'> 
                        <h1 className="w-fit">{item.name}</h1> 
                        <h2>price: {item.price}€</h2>
                        <img className='w-25' src={item.image} alt={`image of ${item.name}`} />
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const categoriesCount = await Parser.getRimiCategoriesCount();
    const paths = [] as string[];
    for (let i = 0; i < categoriesCount; i++) {
        paths.push("/category/rimi/" + i);
    }
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }: any) {
    const category = await Parser.getRimiCategoryById(params.id);
    if (!category.link) return;
    const title = category.title;
    const itemsData = await Parser.getRimiItemsByCategory(category);
    return {
        props: {
            itemsData,
            title
        }
    };
}
