import Link from "next/link";
import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import {GroceryFromDB} from "../server/models/Product";

interface Props {
    name: string;
    image: string;
    minPrice: number;
    rimi_price?: number;
    barbora_price?: number;
    selver_price?: number;
    coop_price?: number;
    category: string;
    onChanged(count: number): void;
    count: number;
}

export default function SmallProduct(props: Props) {
    const [counter, setCounter] = useState<number>(0);
    const price = String(props.minPrice).split('.');

    useEffect(() => {
        props.onChanged(counter);
    }, [counter])

    useEffect(() => {
        if (localStorage.getItem('cart') !== null) {
            const result = new Map(JSON.parse(localStorage.getItem('cart')!)) as Map<string, [GroceryFromDB, number]>;
            if (result) {
                setCounter(result.get(props.name) ? result.get(props.name)![1] : 0);
            }
        }
    }, [])

    useEffect(() => {
        setCounter(props.count);
    }, [props.count])


    const allPrices = [props.rimi_price ?? 0, props.coop_price ?? 0, props.barbora_price ?? 0, props.selver_price ?? 0];

    return (
        <div className="pr-5 pl-5 bg-white text-center flex-[1_0_15%] w-60 h-100 min-h-fit mt-16 rounded-2xl flex-col flex">
            <Link href={{ pathname: '/product/[name]', query: { name: props.name, count: String(counter) } }} as='/product/[name]' className="self-center mt-4 place-content-center place-items-center flex flex-col transition ease-in-out delay-50  hover:text-orange-700 duration-200">
                <img alt={"a picture of " + props.name} className="p-5" src={props.image}></img>
                <div className="w-32 h-[78px] overflow-hidden text-ellipsis">
                    <p className="text-slate-700 font-sans text-md">{props.name}</p>
                </div>
            </Link>

            <div className="m-3 self-center place-content-center w-4/5 h-full">
                <div className="flex place-content-start items-center">
                    <span className="text-slate-800 self-center mb-auto text-5xl font-bold mt-auto">{price[0]}</span>
                    <div>
                        <p className="align-super text-slate-800 text-2xl block ">{price[1]}</p>
                        <p className="align-super text-slate-800 block text-2xl -mt-2">€</p>
                    </div>
                </div>
                <div className="mb-4 h-[70%] w-full flex flex-col place-content-center">
                    <AddToCartButton
                        counter={counter}
                        onClicked={(counter) => setCounter(counter)}
                    />
                </div>
            </div>
        </div>
    )
}
