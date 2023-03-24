import Chart, { CategoryScale } from 'chart.js/auto';
import { Grocery } from "groceries-component";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import BigProduct from "../../components/BigProduct";
import NavigationBar from "../../components/NavigationBar";
import { createChart } from "../../utils/parseData";

export default function BigProductPage( { data }: any) {
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState<Map<string, [Grocery, number]>>(new Map());
    Chart.register(CategoryScale);
    const router = useRouter();
    if (typeof router.query.product !== "string") return;
    const [counter, setCounter] = useState(typeof router.query.count === 'string' ? Number(router.query.count) : 0);
    const item = JSON.parse(router.query.product) as Grocery;
    
    const image = item.image;
    const name = item.name;
    const rimiPrice = item.rimi_price;
    const selverPrice = item.selver_price;
    const coopPrice = item.coop_price;
    const barboraPrice = item.barbora_price;

    useEffect(() => {
        if (localStorage.getItem('cart') !== null) {
            setCart(new Map(JSON.parse(localStorage.getItem('cart')!)));
        }
    }, [])
 
    useEffect(() => {
		// console.log(cart);
		// setTimeout(() => setHasChanged(false), 1000);
        console.log('kek');
		let currentTotal = 0;
		cart.forEach((product, title) => {
			currentTotal += product[1] * (product[0].allPrices ? Math.min.apply(null, product[0].allPrices) : 0);
		});
		setTotal(Number(currentTotal.toFixed(2)));
		localStorage.setItem('cart', JSON.stringify(Array.from(cart.entries())));
		// console.log(localStorage.getItem('cart'));
	}, [cart])

    // console.log(product);

    return(
        <>
            <NavigationBar 
                total={total} 
                cart={cart} 
                triggerOpen={false}
                onChanged={(product, count) => {
                    setCounter(count);
                    if (counter !== 0) {
						setCart(new Map(cart.set(product.name, [product, count])))
					} else {
						cart.delete(product.name);
						setCart(new Map(cart));
					}
                }}
            />
            <BigProduct
                count={counter}
                image={image}
                productName={name}
                rimiPrice={rimiPrice}
                selverPrice={selverPrice}
                coopPrice={coopPrice}
                barboraPrice={barboraPrice}
                onChanged={(count) => {
                    if (count !== 0) {
                        // console.log(JSON.stringify(Array.from(cart.entries()).pop()?.[0]));
                        // console.log(cart);
                        setCart(new Map(cart.set(item.name, [item, count])));
                    } else {
                        cart.delete(item.name);
                        setCart(new Map(cart));
                    }
                    // setHasChanged(true);
                }}
            />
           {data.datasets.length > 0 ? 
                <div className='bg-white rounded-lg px-5 py-10 flex flex-col self-center items-center w-4/5 md:w-3/5 mt-10 mb-10 h-full'>
                    <h1 className='self-start ml-5 mb-10 text-2xl sm:text-3xl md:text-5xl font-poppins font-semibold text-slate-800'>HinnaOthertused</h1>
                    <Line width={1000} height={500} data={data}/>
                </div> 
            : null}
        </>
    )
}

export async function getStaticPaths() {
    // const products = [...await Parser.getAllBarboraItems(), ...await Parser.getAllRimiItems()];
    const paths = [] as any[];
    // for (let i = 0; i < products.length; i++) {
    //     paths.push("/product/" + products[i].name);
    // }
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }: any) {
    // console.log(params);
    
    const data = await createChart(params.name);
    // const data = {};
    return {
        props: {
            data
        }
    }
}
