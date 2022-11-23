import BigProduct from "../components/BigProduct";
import BreadPicture from "../../src/images/bread.svg";

export default function BigProductPage({}){
    return(
        <BigProduct 
        image={BreadPicture}
        productName='Product Name'
        rimiPrice={12.22}
        selverPrice={12.22}
        coopPrice={13.22}
        barboraPrice={15.56}
        />
    )
}