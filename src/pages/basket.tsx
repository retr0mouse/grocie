import { Grocery } from "groceries-component";
import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Pagination from "../components/Pagination";
import RemoveIcon from "@mui/icons-material/Remove";
import img from 'next/image';
import Link from "next/link";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Image from 'next/image';
import Barbora from "../images/barbore.png"
import Rimi from "../images/rime.png"
import Coop from "../images/cope.png"
import Selver from "../images/selve.png"

export default function Basket() {
	const [total, setTotal] = useState(0);
    const [cart, setCart] = useState<Map<Grocery, number>>(new Map());
	const [hasChanged, setHasChanged] = useState(false);
    let items = [] as Grocery[];
	let values = [] as number[];

    if (cart.size !== 0) {
		items = Array.from(cart.keys());
		values = Array.from(cart.values());
	}

	useEffect(() => {
        if (localStorage.getItem('cart') !== null) setCart(new Map(JSON.parse(localStorage.getItem('cart')!)));
        // console.log(JSON.parse(localStorage.getItem('cart')!));
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

    return (
        <>
            <NavigationBar
                total={total}
                triggerOpen={hasChanged}
                items={cart}
            />
            <div className="flex justify-center">
                <div className="flex justify-center flex-col">  
                    <h1>Cart</h1>
                    {items.map((item, index) => {
                        return (
                            <div className="pr-5 pl-5 bg-white text-center flex-[1_0_15%] w-60 h-[400px] mt-16 rounded-2xl flex-row flex">
                                <img height={230} width={230} alt={"a picture of " + item.name} className="" src={item.image}></img>
                                <p className="font-sans font-semibold ">{item.name}</p>

                                <div className="mt-auto self-center place-content-center w-3/4">
                                <div className="pr-10 flex-col space-y-10 w-[20rem]">
                                    {item.barbora_price ? <div className="flex flex-raw items-center">
                                        <Image alt="barbora logo" className="w-16 h-6 mr-16 flex" src={Barbora}></Image>
                                        <p className="text-2xl text-orange-500 font-medium">{item.barbora_price}</p>
                                    </div>: null}
                                    {item.rimi_price ? <div className="flex flex-raw items-center">
                                        <Image alt="rimi logo" className="w-auto h-6 mr-16 flex" src={Rimi}></Image>
                                        <p className="text-2xl text-orange-500 font-medium">{item.rimi_price}</p>
                                    </div>: null}
                                    {item.selver_price ? <div className="flex flex-raw items-center">
                                        <Image alt="rimi logo" className="w-auto h-6 mr-16 flex" src={Selver}></Image>
                                        <p className="text-2xl text-orange-500 font-medium">{item.selver_price}</p>
                                    </div>: null}
                                    {item.coop_price ? <div className="flex flex-raw items-center">
                                        <Image alt="rimi logo" className="w-16 h-6 mr-16 flex" src={Coop}></Image>
                                        <p className="text-2xl text-orange-500 font-medium">{item.coop_price}</p>
                                    </div>: null}
                                </div>

                                    <div className="mb-4 mt-10 h-8 border-orange-500 border-2 rounded-full space-x-16 flex flex-row place-content-center place-items-center">
                                        <IconButton
                                            color="primary"
                                            disabled={values[index] == 0}
                                            aria-label="upload picture"
                                            component="label"
                                            onClick={() => values[index] = (values[index] - 1)}
                                            className="ml-0"
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <p className="">{values[index]}</p>
                                        <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="label"
                                            onClick={() => values[index] = (values[index] + 1)}
                                            className=""
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
