import Link from "next/link";
import {GroceryFromDB} from "../server/models/Product";


interface Props {
    item: GroceryFromDB;
}

export default function SearchBarItem(props: Props) {
    const allPrices = [props.item.rimi_price ?? 0, props.item.coop_price ?? 0, props.item.barbora_price ?? 0, props.item.selver_price ?? 0];
    return (
        <div className='flex items-center bg-white rounded-xl'>
            <Link href={{ pathname: '/product/[name]', query: { name: props.item?.name } }} as='/product/[name]'>
                <div className='flex items-center  gap-3 mb-2 p-2'>
                    <div className={'block relative'}>
                        <img className={"w-20"} src={props.item.product_image} />
                    </div>
                    <p><span>{props.item.name.length > 25 ? props.item.name.substring(0, 25) + '...' : props.item.name}</span> <span className='flex text-orange-600 font-bold'>{Math.min.apply(null, allPrices)} €</span></p>
                </div>
            </Link>
        </div>
    );
}
