import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import Pagination from '../components/Pagination';
import SmallProduct from '../components/SmallProduct';
import {GroceryFromDB} from "../server/models/Product";

export async function getStaticProps() {  // for ssg
	// const allCategoriesBarbora = await Parser.getBarboraCategories();
	// const allCategoriesRimi = await Parser.getRimiCategories();
	// const allItemsBarbora = await Parser.getAllBarboraItems();
	// const allMeatItems = await Database.getProductsByCategory("Fruits and Vegetables");

	return {
		props: {
			// allCategoriesBarbora,
			// allCategoriesRimi,
			// allItemsBarbora,
			// allMeatItems
		}
	}
}

export default function Home({ allCategoriesBarbora, allCategoriesRimi, allItemsBarbora, allMeatItems }: { allCategoriesBarbora: any[], allCategoriesRimi: any[], allItemsBarbora: any[], allMeatItems: any[] }) {
	// const mutation = trpc.storeItems.useMutation();
	// const [title, setTitle] = useState("Banaan");
	// const [result, setResult] = useState("Banaan");
	const [total, setTotal] = useState(0);
	// const query = trpc.findItem.useQuery({ title: result });
	const [localCart, setLocalCart] = useState<Map<string, [GroceryFromDB, number]>>(new Map());
	const [hasChanged, setHasChanged] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('cart') !== null) setLocalCart(new Map(JSON.parse(localStorage.getItem('cart')!)));
		// console.log(JSON.parse(localStorage.getItem('cart')!));
	}, [])

	useEffect(() => {
		// console.log(cart);
		// setTimeout(() => setHasChanged(false), 1000);
		let currentTotal = 0;
		localCart.forEach((item, title) => {
			const allPrices = [item[0].rimi_price ?? 0, item[0].coop_price ?? 0, item[0].barbora_price ?? 0, item[0].selver_price ?? 0];
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
		if (allMeatItems) return allMeatItems.slice(firstPageIndex, lastPageIndex);
	}, [currentPage]);

	return (
		<>
			<NavigationBar
				total={total}
				triggerOpen={hasChanged}
				cart={localCart}
				onChanged={(item, counter) => {
					if (counter !== 0) {
						setLocalCart(new Map(localCart.set(item.name, [item, counter])))
					} else {
						localCart.delete(item.name);
						setLocalCart(new Map(localCart));
					}
				}}
			/>
			<div className={"flex flex-wrap self-center gap-3 grow"}>
				{currentItems?.map((item: GroceryFromDB, index: number) => {
					const allPrices = [item.rimi_price ?? 0, item.coop_price ?? 0, item.barbora_price ?? 0, item.selver_price ?? 0];
					if (!allPrices) return;
					const minPrice = Math.min.apply(null, allPrices);
					return (
						<SmallProduct
							count={localCart.get(item.name)?.[1] ?? 0}
							key={index}
							image={item.product_image}
							name={item.name}
							minPrice={minPrice}
							rimi_price={item.rimi_price}
							barbora_price={item.barbora_price}
							selver_price={item.selver_price}
							coop_price={item.coop_price}
							category={item.category}
							onChanged={(number) => {
								if (number !== 0) {
									setLocalCart(new Map(localCart.set(item.name, [item, number])))
								} else {
									localCart.delete(item.name);
									setLocalCart(new Map(localCart));
								}
								// setHasChanged(true);
							}}
						/>
					)
				})}
			</div>
			<Pagination
				onPageChange={page => setCurrentPage(page)}
				totalCount={allMeatItems?.length ?? 0}
				currentPage={currentPage}
				pageSize={pageSize}
			/>
			{/*
			 <div className="flex p-10 absolute gap-10 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border-solid border-2 border-indigo-400 rounded-2xl">
				<div className='flex flex-col items-center gap-5'>
				<h1 className="font-sans text-4xl font-bold">Barbora</h1>
				<div className='flex flex-col'>
					{allCategoriesBarbora.map((item: any, key) => {
					return (
						<Link legacyBehavior key={key} href={`/category/barbora/${item.path}`}><a key={key} className='font-sans text-lg py-1.5 pl-1 pr-1my-2 hover:underline visited:text-purple-600'>{item.title}</a></Link>
					);
					})}
				</div>
				</div>

				<div className='flex flex-col items-center gap-5'>
				<h1 className="font-sans text-4xl font-bold">Rimi</h1> 
				<div className='flex flex-col'>
					{allCategoriesRimi.map((item: any, key) => {
					return (
					<Link legacyBehavior key={key} href={`/category/rimi/${item.path}`}><a key={key} className='font-sans text-lg py-1.5 pl-1 pr-1my-2 hover:underline visited:text-purple-600'>{item.title}</a></Link>
					);
				})}
				</div>
				</div>
			</div>*/}
			{/* <div className={"relative left-1/2 transform -translate-x-1/2 flex flex-col w-10, "}> */}
			{/* <input type="text" className={"bg-slate-600"} defaultValue={title} onChange={(input) => setTitle(input.target.value)}/> */}
			{/* <button className={"bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"} onClick={() => mutation.mutate()}>BREAK EVERYTHING</button> */}
			{/* <h1 className={"bg-red-600"}>RESULT: {query.data ?? "nothing"}</h1> */}
			{/* </div> */}
		</>
	)
}
