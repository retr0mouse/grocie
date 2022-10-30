import { Grocery } from "groceries-component";
import { getBarboraCategoriesById, getBarboraCategoriesCount, getBarboraItemsByUrl } from "../../../lib/items";

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
    const categoriesCount = await getBarboraCategoriesCount();
    const paths = [];
    for (let i = 0; i < categoriesCount; i++) {
        paths.push("/category/barbora/" + i)
    }
    return {
        paths,
        fallback: false
    };
}
    
export async function getStaticProps({ params }: any) {
    const itemsData = [] as Grocery[];
    const category = await getBarboraCategoriesById(params.id);
    const title = category.title;
    let index = 1;
    while (true) {
        const items = await getBarboraItemsByUrl(`https://barbora.ee/${category.link}?page=${index}`);
        if (items.length == 0) break;
        itemsData.push(...items);
        index++;
    }
    return {
        props: {
            itemsData,
            title
        }
    };
}
