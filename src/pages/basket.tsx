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
                <div className="flex items-center flex-col space-y-5">  
                    <h1 className="text-4xl text-orange-400 mb-10">Cart</h1>
                    {items.map((item, index) => {
                        return (
                        <div className=" bg-white text-center w-auto h-auto rounded-2xl flex-row flex justify-between">
                            <div className="flex flex-col p-1">
                                <p className="font-sans font-semibold text-xl">{item.name}</p>
                                <img height={100} width={100} alt={"a picture of " + item.name} className="w-64 h-60" src={item.image}></img>
                            </div>
                            <div className="self-center place-content-center items-center">
                                <div className="flex-col space-y-10 w-auto">
                                    {item.barbora_price ? <div className="flex flex-raw items-center">
                                        <Image alt="barbora logo" className="w-20 h-8 mr-16 flex" src={Barbora}></Image>
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
                                        <Image alt="rimi logo" className="-ml-2 w-auto h-8 mr-14 flex" src={Coop}></Image>
                                        <p className="text-2xl text-orange-500 font-medium">{item.coop_price}</p>
                                    </div>: null}
                                </div>

                                    <div className="mb-4 mt-10 h-auto w-auto border-orange-500 border-2 rounded-full flex flex-row justify-between items-center">
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
