import { Grocery } from "groceries-component";
import { NextRouter, useRouter, withRouter } from "next/router";
import BigProduct from "../../components/BigProduct";
import { Parser } from "../../server/lib/Parser";
import BreadPicture from "../../src/images/bread.svg";

export default function BigProductPage( { product }: any){
    
    const image = product.image;
    const name = product.name;
    const rimiPrice = product.rimiPrice;
    const selverPrice = product.selverPrice;
    const coopPrice = product.coopPrice;
    const barboraPrice = product.barboraPrice;

    console.log(product);

    return(
        <BigProduct 
            image={image}
            productName={name}
            rimiPrice={rimiPrice}
            selverPrice={selverPrice}
            coopPrice={coopPrice}
            barboraPrice={barboraPrice}
        />
    )
}

export async function getStaticPaths() {
    // const products = [...await Parser.getAllBarboraItems(), ...await Parser.getAllRimiItems()];
    const paths = ["/product/what"] as string[];
    // for (let i = 0; i < products.length; i++) {
    //     paths.push("/product/" + products[i].name);
    // }
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps() {
    const router = useRouter();
    if (typeof router.query.product !== "string") return;
    const product = JSON.parse(router.query.product);
    
    // console.log(params);
    // const name = params.productName;
    // const image = params.image;
    return {
        props: {
            product: product
        }
    }
}
