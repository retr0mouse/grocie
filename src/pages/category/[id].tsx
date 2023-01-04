import { Grocery } from "groceries-component";
import { useEffect, useMemo, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Pagination from "../../components/Pagination";
import SmallProduct from "../../components/SmallProduct";
import { Database } from "../../server/middleware/Database";

export default function Category({ itemsData, categoryTitle }: any) {
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState<Map<string, [Grocery, number]>>(new Map());

    useEffect(() => {
        if (localStorage.getItem('cart') !== null) setCart(new Map(JSON.parse(localStorage.getItem('cart')!)));
    }, []) 

    useEffect(() => {
		// console.log(cart);
		// setTimeout(() => setHasChanged(false), 1000);
		let currentTotal = 0;
		cart.forEach((item, title) => {
			currentTotal += item[1] * (item[0].allPrices ? Math.min.apply(null, item[0].allPrices) : 0);
		});
		setTotal(Number(currentTotal.toFixed(2)));
		localStorage.setItem('cart', JSON.stringify(Array.from(cart.entries())));
		// console.log(localStorage.getItem('cart'));
	}, [cart])

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
                items={cart}
                triggerOpen={false}
				onChanged={(item, counter) => {
					if (counter !== 0) {
						setCart(new Map(cart.set(item.name, [item, counter])))
					} else {
						cart.delete(item.name);
						setCart(new Map(cart));
					}
				}}
            />
            <h1 className="ml-5 mt-5 text-5xl font-sans font-semibold text-slate-800">{categoryTitle}</h1>
            <div className={"flex flex-wrap self-center gap-3 mx-5"}>
				{currentItems?.map((item: Grocery, index: number) => {
					if (!item.allPrices) return;
					const minPrice = Math.min.apply(null, item.allPrices);
					return (
						<SmallProduct 
							count={cart.get(item.name)?.[1] ?? 0}
							key={item.name + index}
							image={item.image}
							name={item.name}
							minPrice={minPrice}
							rimi_price={item.rimi_price}
							barbora_price={item.barbora_price}
							selver_price={item.selver_price}
							coop_price={item.coop_price}
							onChanged={(number) => {
								if (number !== 0) {
									setCart(new Map(cart.set(item.name, [item, number])));
								} else {
									cart.delete(item.name);
									setCart(new Map(cart));
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
    if (!itemsData) return {
		notFound: true
	}
    return {
        props: {
            itemsData,
            categoryTitle,
        },
		revalidate: 10
    };
}
