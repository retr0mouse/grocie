import { Grocery } from "groceries-component";
import { NextRouter, useRouter, withRouter } from "next/router";
import { Line } from "react-chartjs-2";
import BigProduct from "../../components/BigProduct";
import NavigationBar from "../../components/NavigationBar";
import { Parser } from "../../server/lib/Parser";
import BreadPicture from "../../src/images/bread.svg";
import { createChart } from "../../utils/parseData";
import Chart, { CategoryScale } from 'chart.js/auto';

export default function BigProductPage( { data }: any){
    Chart.register(CategoryScale);
    console.log(data);
    const router = useRouter();
    if (typeof router.query.product !== "string") return;
    const product = JSON.parse(router.query.product) as Grocery;
    
    const image = product.image;
    const name = product.name;
    const rimiPrice = product.rimi_price;
    const selverPrice = product.selver_price;
    const coopPrice = product.coop_price;
    const barboraPrice = product.barbora_price;

    // console.log(product);

    return(
        <div className={'flex flex-col'}>
            {/* <NavigationBar/> */}
            <BigProduct 
                image={image}
                productName={name}
                rimiPrice={rimiPrice}
                selverPrice={selverPrice}
                coopPrice={coopPrice}
                barboraPrice={barboraPrice}
            />
            
            <Line data={data}/>
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
