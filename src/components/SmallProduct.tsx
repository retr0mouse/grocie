import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { createTheme, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Grocery } from "groceries-component";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { object } from "zod";
import Category from "../pages/category/[id]";

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
}


const Color = createTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: '#ff5722',
        },
    }
});

export default function SmallProduct(props: Props) {
    const [counter, setCounter] = useState<number>(0);
    const price = String(props.minPrice).split('.');

    useEffect(() => {
        if (typeof counter === 'undefined' || counter < 0) return;
        props.onChanged(counter);
    }, [counter])

    useEffect(() => {
        if (localStorage.getItem('cart') !== null) {
            const result = new Map(JSON.parse(localStorage.getItem('cart')!)) as Map<string, [Grocery, number]>;
            if (result) {
                setCounter(result.get(props.name) ? result.get(props.name)![1] : 0);
            }
        }
    }, [])

    const thisProduct = {
        name: props.name,
        price: props.minPrice,
        barbora_price: props.barbora_price,
        rimi_price: props.rimi_price,
        selver_price: props.selver_price,
        coop_price: props.coop_price,
        image: props.image,
        category: props.category,
        allPrices: []
    } as Grocery;

    if (props.rimi_price && thisProduct.allPrices) thisProduct.allPrices.push(props.rimi_price);
    if (props.barbora_price && thisProduct.allPrices) thisProduct.allPrices.push(props.barbora_price);
    if (props.coop_price && thisProduct.allPrices) thisProduct.allPrices.push(props.coop_price);
    if (props.selver_price && thisProduct.allPrices) thisProduct.allPrices.push(props.selver_price);

    return (
        <div className="pr-5 pl-5 bg-white text-center flex-[1_0_15%] w-60 h-[400px] mt-16 rounded-2xl flex-col flex">
            {/* <Link href={{ pathname: `/product/${props.name}`}} className="self-center mt-4 place-content-center place-items-center flex flex-col transition ease-in-out delay-50  hover:text-orange-700 duration-200"> */}
            <Link href={{ pathname: '/product/[name]', query: { name: thisProduct.name, product: JSON.stringify(thisProduct), count: String(counter) }}} as='/product/[name]' className="self-center mt-4 place-content-center place-items-center flex flex-col transition ease-in-out delay-50  hover:text-orange-700 duration-200">
                <img height={230} width={230} alt={"a picture of " + props.name} className="" src={props.image}></img>
                <p className="font-sans font-semibold ">{props.name}</p>
            </Link>

            <div className="mt-auto self-center place-content-center w-3/4">
                <div className="flex flex-raw place-content-center items-center">
                    <span className="text-orange-700 self-center mb-auto text-5xl font-bold mt-auto">{price[0]}</span>
                    <div>
                        <sup className="text-orange-700 text-2xl block ">{price[1]}</sup>
                        <sub className="text-orange-700 block text-2xl -mt-6">€</sub>
                    </div>
                </div>
                
                {counter && counter > 0 ? 
                    <div className="mb-4 mt-10 h-8 border-orange-500 border-2 rounded-full justify-between flex flex-row place-content-center place-items-center">
                        <IconButton
                            color="primary"
                            disabled={counter == 0}
                            aria-label="upload picture"
                            component="label"
                            onClick={() => setCounter(counter - 1)}
                            className="ml-0"
                        >
                            <RemoveIcon />
                        </IconButton>
                        <p className="">{counter}</p>
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                            onClick={() => setCounter(counter + 1)}
                            className=""
                        >
                            <AddIcon />
                        </IconButton>
                    </div> 
                    : 
                    <div className="flex mb-4 mt-10 place-content-center transition ease-in-out delay-50 hover:bg-orange-400 duration-200 bg-orange-200 border-2 border-orange-500 rounded">
                        <button onClick={() => setCounter(1)} className="text-gray-800 font-bold flex text-xl">Lisa ostukorvi</button>
                    </div>
                }
            </div>
        </div>
    )
}
