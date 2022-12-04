import { Grocery } from "groceries-component";
import { useEffect, useMemo, useState } from "react";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import Pagination from "../../components/Pagination";
import SmallProduct from "../../components/SmallProduct";
import { Parser } from "../../server/lib/Parser";
import { Database } from "../../server/middleware/Database";

export default function Category({ itemsData, title }: any) {
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState<Map<Grocery, number>>(new Map());

    useEffect(() => {
        if (localStorage.getItem('cart') !== null) setCart(new Map(JSON.parse(localStorage.getItem('cart')!)));
    }, []) 

    useEffect(() => {
		// console.log(cart);
		// setTimeout(() => setHasChanged(false), 1000);
		let currentTotal = 0;
		cart.forEach((count, product) => {
			currentTotal += count * (product.allPrices ? Math.min.apply(null, product.allPrices) : 0);
		});
		setTotal(Math.round(currentTotal * 100) / 100);
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
	}, [currentPage]);
    
    return (
        <>
            <NavigationBar
                total={total}
                items={cart}
                triggerOpen={false}
            />
            <h1 className="w-fit relative left-[50%] translate-x-[-50%] mt-5 font-sans text-5xl font-bold">{title}</h1>
            <div className={"flex flex-wrap self-center space-x-3"}>
				{currentItems?.map((item: Grocery, index: number) => {
					if (!item.allPrices) return;
					const minPrice = Math.min.apply(null, item.allPrices);
					return (
						<SmallProduct 
							key={index}
							image={item.image} 
							name={item.name} 
							minPrice={minPrice}
							rimi_price={item.rimi_price}
							barbora_price={item.barbora_price}
							selver_price={item.selver_price}
							coop_price={item.coop_price}
							onChanged={(number) => {
								if (number !== 0) {
									setCart(new Map(cart.set(item, number)))
								} else {
									cart.delete(item);
									setCart(new Map(cart));
								}
								// setHasChanged(true);
							}} 
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
            <Footer/>
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
    if (!categoryTitle) return;
    //console.log("title: " + categoryTitle);
    const itemsData = await Database.getProductsByCategory(categoryTitle!) ?? {};
    //console.log(itemsData.length);
    return {
        props: {
            itemsData,
            categoryTitle
        }
    };
}