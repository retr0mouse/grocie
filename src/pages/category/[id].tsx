import { useEffect, useMemo, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Pagination from "../../components/Pagination";
import SmallProduct from "../../components/SmallProduct";
import { Database } from "../../server/middleware/Database";
import {GroceryFromDB} from "../../server/models/Product";
import {INFINITY} from "chart.js/helpers";

export default function Category({ itemsData, categoryTitle }: { itemsData: GroceryFromDB[], categoryTitle: string}) {
    const [total, setTotal] = useState(0);
    const [localCart, setLocalCart] = useState<Map<string, [GroceryFromDB, number]>>(new Map());

    useEffect(() => {
        if (localStorage.getItem('cart') !== null) setLocalCart(new Map(JSON.parse(localStorage.getItem('cart')!)));
    }, []) 

    useEffect(() => {
		// console.log(cart);
		// setTimeout(() => setHasChanged(false), 1000);
		let currentTotal = 0;
		localCart.forEach((item) => {
            const allPrices = [item[0].rimi_price ?? Infinity, item[0].coop_price ?? Infinity, item[0].barbora_price ?? Infinity, item[0].selver_price ?? Infinity];
			currentTotal += item[1] * (allPrices ? Math.min.apply(null, allPrices) : 0);
		});
		setTotal(Number(currentTotal.toFixed(2)));
		localStorage.setItem('cart', JSON.stringify(Array.from(localCart.entries())));
		// console.log(localStorage.getItem('cart'));
	}, [localCart])

    const [currentPage, setCurrentPage] = useState(1) as any;

	const pageSize = 48;

    const currentItems = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		// console.log("page changed");
		//console.log(allMeatItems.length);
		if (itemsData) return itemsData.slice(firstPageIndex, lastPageIndex);
	}, [[currentPage], []]);
    
    return (
        <>
            <NavigationBar
                total={total}
                cart={localCart}
                triggerOpen={false}
				onChanged={(item, counter) => {
					if (counter !== 0) {
						setLocalCart(new Map(localCart.set(item.name, [item, counter])))
					} else {
						localCart.delete(item.name);
						setLocalCart(new Map(localCart));
					}
				}}
            />
            <h1 className="ml-5 mt-5 text-5xl font-sans font-semibold text-slate-800">{categoryTitle}</h1>
            <div className={"flex flex-wrap self-center gap-3 grow"}>
				{currentItems?.map((item: GroceryFromDB, index: number) => {
                    const allPrices = [item.rimi_price ?? Infinity, item.coop_price ?? Infinity, item.barbora_price ?? Infinity, item.selver_price ?? Infinity];
					if (!allPrices) return;
					const minPrice = Math.min.apply(null, allPrices);
					return (
						<SmallProduct 
							count={localCart.get(item.name)?.[1] ?? 0}
							key={item.name + index}
							image={item.product_image}
							name={item.name}
							minPrice={minPrice}
							rimi_price={item.rimi_price}
							barbora_price={item.barbora_price}
							selver_price={item.selver_price}
							coop_price={item.coop_price}
							onChanged={(number) => {
								if (number !== 0) {
									setLocalCart(new Map(localCart.set(item.name, [item, number])));
								} else {
									localCart.delete(item.name);
									setLocalCart(new Map(localCart));
								}
								// setHasChanged(true);
							} } 
							category={item.category}						
						/>
					)
				})}
			</div>
            <Pagination 
				onPageChange={page => setCurrentPage(page)} 
				totalCount={itemsData?.length ?? 0}
				currentPage={currentPage} 
				pageSize={pageSize}
			/>
        </>
    );
}

export async function getStaticPaths() {
    const paths = [] as string[];
    const categoriesCount = Database.getCategoriesCount();
    for (let i = 0; i < categoriesCount; i++) {
        paths.push("/category/" + i);
    }
    return {
        paths,
        fallback: false
    };
}
    
export async function getStaticProps({ params }: any) {
    const categoryTitle = Database.getCategoryTitleById(params.id);
    if (!categoryTitle) return {
		notFound: true
	};
    // console.log("title: " + categoryTitle);
    const itemsData = await Database.getProductsByCategory(categoryTitle!);
    // console.log(itemsData);
    if (!itemsData) return {
		notFound: true
	}
    console.log(itemsData[0]);
    return {
        props: {
            itemsData,
            categoryTitle,
        },
		revalidate: 10
    };
}
