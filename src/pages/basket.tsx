import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { Grocery } from "groceries-component";
import Image from 'next/image';
import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Barbora from "../images/barbore.png";
import Coop from "../images/cope.png";
import Rimi from "../images/rime.png";
import Selver from "../images/selve.png";

export default function Basket() {
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState<Map<string, [Grocery, number]>>(new Map());
    const [hasChanged, setHasChanged] = useState(false);
    let titles: string[] = [];
    let values: [Grocery, number][] = [];

    useEffect(() => {
        if (localStorage.getItem('cart') !== null) setCart(new Map(JSON.parse(localStorage.getItem('cart')!)));
        // console.log(JSON.parse(localStorage.getItem('cart')!));
    }, [])

    if (cart.size !== 0) {
        titles = Array.from(cart.keys());
        values = Array.from(cart.values());
    }

    useEffect(() => {
        // console.log(cart);
        // setTimeout(() => setHasChanged(false), 1000);
        let currentTotal = 0;
        cart.forEach((item, title) => {
            currentTotal += item[1] * (item[0].allPrices ? Math.min.apply(null, item[0].allPrices) : 0);
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
                    {values?.map((item, index) => {
                        return (
                            <div className=" bg-white text-center w-auto h-auto rounded-2xl flex-row flex justify-between" key={index}>
                                <div className="flex flex-col p-1">
                                    <p className="font-sans font-semibold text-xl">{item[0].name}</p>
                                    <img height={100} width={100} alt={"a picture of " + item[0].name} className="w-64 h-60" src={item[0].image}></img>
                                </div>
                                <div className="self-center place-content-center items-center">
                                    <div className="flex-col space-y-10 w-auto">
                                        {item[0].barbora_price ? <div className="flex flex-raw items-center">
                                            <Image alt="barbora logo" className="w-20 h-8 mr-16 flex" src={Barbora}></Image>
                                            <p className="text-2xl text-orange-500 font-medium">{item[0].barbora_price}</p>
                                        </div> : null}
                                        {item[0].rimi_price ? <div className="flex flex-raw items-center">
                                            <Image alt="rimi logo" className="w-auto h-6 mr-16 flex" src={Rimi}></Image>
                                            <p className="text-2xl text-orange-500 font-medium">{item[0].rimi_price}</p>
                                        </div> : null}
                                        {item[0].selver_price ? <div className="flex flex-raw items-center">
                                            <Image alt="rimi logo" className="w-auto h-6 mr-16 flex" src={Selver}></Image>
                                            <p className="text-2xl text-orange-500 font-medium">{item[0].selver_price}</p>
                                        </div> : null}
                                        {item[0].coop_price ? <div className="flex flex-raw items-center">
                                            <Image alt="rimi logo" className="-ml-2 w-auto h-8 mr-14 flex" src={Coop}></Image>
                                            <p className="text-2xl text-orange-500 font-medium">{item[0].coop_price}</p>
                                        </div> : null}
                                    </div>
                                    <div className="mb-4 mt-10 h-auto w-auto border-orange-500 border-2 rounded-full flex flex-row justify-between items-center">
                                        <IconButton
                                            color="primary"
                                            disabled={item[1] == 0}
                                            aria-label="upload picture"
                                            component="label"
                                            onClick={() => item[1] = (item[1] - 1)}
                                            className="ml-0"
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <p className="">{item[1]}</p>
                                        <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="label"
                                            onClick={() => item[1] = (item[1] + 1)}
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
