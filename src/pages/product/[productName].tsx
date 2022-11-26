import { Grocery } from "groceries-component";
import { NextRouter, useRouter, withRouter } from "next/router";
import BigProduct from "../../components/BigProduct";
import NavigationBar from "../../components/NavigationBar";
import { Parser } from "../../server/lib/Parser";
import BreadPicture from "../../src/images/bread.svg";

export default function BigProductPage( {}: any){
    const router = useRouter();
    if (typeof router.query.product !== "string") return;
    const product = JSON.parse(router.query.product) as Grocery;
    
    const image = product.image;
    const name = product.name;
    const rimiPrice = product.price;
    const selverPrice = product.price;
    const coopPrice = product.price;
    const barboraPrice = product.price;

    console.log(product);

    return(
        <div className={'flex flex-col'}>
            <NavigationBar/>
            <BigProduct 
                image={image}
                productName={name}
                rimiPrice={rimiPrice}
                selverPrice={selverPrice}
                coopPrice={coopPrice}
                barboraPrice={barboraPrice}
            />
        </div>
    )
}

// export async function getStaticPaths() {
//     // const products = [...await Parser.getAllBarboraItems(), ...await Parser.getAllRimiItems()];
//     const paths = ["/product/what"] as string[];
//     // for (let i = 0; i < products.length; i++) {
//     //     paths.push("/product/" + products[i].name);
//     // }
//     return {
//         paths,
//         fallback: true
//     }
// }

// export async function getStaticProps() {
//     const product = "";
//     // const router = useRouter();
//     // if (typeof router.query.product !== "string") return;
//     // const product = JSON.parse(router.query.product);
    
//     // console.log(params);
//     // const name = params.productName;
//     // const image = params.image;
//     return {
//         props: {
//             product: product
//         }
//     }
// }
