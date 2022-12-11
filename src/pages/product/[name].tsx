import Chart, { CategoryScale } from 'chart.js/auto';
import { Grocery } from "groceries-component";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import BigProduct from "../../components/BigProduct";
import NavigationBar from "../../components/NavigationBar";
import { createChart } from "../../utils/parseData";

export default function BigProductPage( { data }: any){
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState<Map<Grocery, number>>(new Map());
    Chart.register(CategoryScale);
    const router = useRouter();
    if (typeof router.query.product !== "string") return;
    const product = JSON.parse(router.query.product) as Grocery;
    
    const image = product.image;
    const name = product.name;
    const rimiPrice = product.rimi_price;
    const selverPrice = product.selver_price;
    const coopPrice = product.coop_price;
    const barboraPrice = product.barbora_price;

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

    // console.log(product);

    return(
        <div className={'flex flex-col'}>
            <NavigationBar 
                total={total} 
                items={cart} 
                triggerOpen={false}
            />
            <BigProduct 
                image={image}
                productName={name}
                rimiPrice={rimiPrice}
                selverPrice={selverPrice}
                coopPrice={coopPrice}
                barboraPrice={barboraPrice}
            />
            {data.length > 0 ? <Line data={data}/> : null}
        </div>
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
