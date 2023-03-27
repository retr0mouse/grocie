import Chart, { CategoryScale } from 'chart.js/auto';
import { Grocery } from "groceries-component";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import BigProduct from "../../components/BigProduct";
import NavigationBar from "../../components/NavigationBar";
import { createChart } from "../../utils/parseData";
import { trpc } from '../../utils/trpc';

export default function BigProductPage({ chart, name }: any) {
    const productQuery = trpc.getItem.useQuery({ title: name });
    const [total, setTotal] = useState<number>(0);
    const [cart, setCart] = useState<Map<string, [Grocery, number]>>(new Map());
    const router = useRouter();
    const [counter, setCounter] = useState(typeof router.query.count === 'string' ? Number(router.query.count) : 0);

    useEffect(() => {
        Chart.register(CategoryScale);
        if (localStorage.getItem('cart') !== null) {
            setCart(new Map(JSON.parse(localStorage.getItem('cart')!)));
        }
    }, []);

    useEffect(() => {
        let currentTotal = 0;
        cart.forEach((product, title) => {
            currentTotal += product[1] * (product[0].allPrices ? Math.min.apply(null, product[0].allPrices) : 0);
        });
        setTotal(Number(currentTotal.toFixed(2)));
        localStorage.setItem('cart', JSON.stringify(Array.from(cart.entries())));
    }, [cart])

    if (productQuery.status !== 'success') {
        return <>Loading...</>;
    }

    const { data } = productQuery;
    const product = {
        name: data?.name,
        price: Math.min(...[
            data?.barbora_price ?? 0,
            data?.coop_price ?? 0,
            data?.rimi_price ?? 0,
            data?.selver_price ?? 0
        ]),
        barbora_price: data?.barbora_price,
        rimi_price: data?.rimi_price,
        selver_price: data?.selver_price,
        coop_price: data?.coop_price,
        image: data?.product_image,
        category: data?.category,
        allPrices: [
            data?.barbora_price ?? 0,
            data?.coop_price ?? 0,
            data?.rimi_price ?? 0,
            data?.selver_price ?? 0
        ]
    } as Grocery;


    const image = product.image ?? "";
    const title = product.name ?? "";
    const rimiPrice = product.rimi_price;
    const selverPrice = product.selver_price;
    const coopPrice = product.coop_price;
    const barboraPrice = product.barbora_price;

    return (
        <>
            <NavigationBar
                total={total ?? 0}
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
                        setCart(new Map(cart.set(title, [product, count])));
                    } else {
                        cart.delete(title);
                        setCart(new Map(cart));
                    }
                }}
            />
            {chart?.datasets.length > 0 ?
                <div className='bg-white rounded-lg px-5 py-10 flex flex-col self-center items-center w-4/5 md:w-3/5 mt-10 mb-10 h-full'>
                    <h1 className='self-start ml-5 mb-10 text-2xl sm:text-3xl md:text-5xl font-poppins font-semibold text-slate-800'>Price changes</h1>
                    <Line width={1000} height={500} data={chart} />
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
    const chart = await createChart(params.name);
    const { name } = params;
    return {
        props: {
            chart,
            name
        }
    }
}
