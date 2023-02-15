import { Grocery } from "groceries-component";
import Image from 'next/image';
import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Barbora from "../images/barbore.png";
import Coop from "../images/cope.png";
import Rimi from "../images/rime.png";
import Selver from "../images/selve.png";
import Footer from "../components/Footer";

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
        setTotal(Number(currentTotal.toFixed(2)));
        localStorage.setItem('cart', JSON.stringify(Array.from(cart.entries())));
        // console.log(localStorage.getItem('cart'));
    }, [cart])

    return (
        <>
            <NavigationBar
                total={total}
                triggerOpen={hasChanged}
                cart={cart}
                onChanged={(item, counter) => {
                    if (counter !== 0) {
                        setCart(new Map(cart.set(item.name, [item, counter])))
                    } else {
                        cart.delete(item.name);
                        setCart(new Map(cart));
                    }
                }}
            />
            <div className="flex justify-center">
                <div className="flex items-center flex-col space-y-5">
                    <h1 className="self-start text-4xl text-orange-400 mb-6 mt-10">Ostukorv</h1>
                    {values?.map((item, index) => {
                        return (
                            <div className=" bg-white text-center h-auto rounded-2xl flex-row flex justify-between w-fit p-10 items-center gap-24" key={index}>
                                <div className="flex flex-col">
                                    <p className="font-sans font-semibold text-xl">{item[0].name}</p>
                                    <img width={300} alt={"a picture of " + item[0].name} className="" src={item[0].image}></img>
                                </div>
                                <div className="flex-col space-y-10 w-auto">
                                    {item[0].barbora_price ? <div className="flex flex-raw items-center">
                                        <Image alt="barbora logo" className="w-24 mr-16 flex aspect-[3/2] object-contain" src={Barbora}></Image>
                                        <p className="text-2xl text-orange-500 font-medium">{item[0].barbora_price}</p>
                                    </div> : null}
                                    {item[0].rimi_price ? <div className="flex flex-raw items-center">
                                        <Image alt="rimi logo" className="w-24 mr-16 flex aspect-[3/2] object-contain" src={Rimi}></Image>
                                        <p className="text-2xl text-orange-500 font-medium">{item[0].rimi_price}</p>
                                    </div> : null}
                                    {item[0].selver_price ? <div className="flex flex-raw items-center">
                                        <Image alt="rimi logo" className="w-24 mr-16 flex aspect-[3/2] object-contain" src={Selver}></Image>
                                        <p className="text-2xl text-orange-500 font-medium">{item[0].selver_price}</p>
                                    </div> : null}
                                    {item[0].coop_price ? <div className="flex flex-raw items-center">
                                        <Image alt="rimi logo" className="w-24 mr-16 flex aspect-[3/2] object-contain" src={Coop}></Image>
                                        <p className="text-2xl text-orange-500 font-medium">{item[0].coop_price}</p>
                                    </div> : null}
                                </div>
                                <div className="w-[150px] border-orange-500 border-2 rounded-full flex flex-row justify-between items-center">
                                    <button
                                        disabled={item[1] == 0}
                                        onClick={() => item[1] = (item[1] - 1)}
                                        className="ml-0"
                                    >

                                    </button>
                                    <p className="">{item[1]}</p>
                                    <button
                                        onClick={() => item[1] = (item[1] + 1)}
                                        className=""
                                    >
                                        
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                    <h1 className="self-start text-4xl text-orange-400 mb-6 mt-10">Sinu ostukorvi hind</h1>
                    <div className="w-[700px] flex flex-col gap-5">
                        <div className="bg-white rounded-lg p-5">
                            <div className="flex justify-between my-5 ">
                                <p className="text-3xl">Rimi</p>
                                <p className="text-2xl">
                                    €
                                    {
                                        values
                                            .filter(item => item[0].rimi_price)
                                            .map(item => item[1] * item[0].rimi_price!)
                                            .reduce((resultItem, currentItem) => resultItem + currentItem, 0)
                                            .toFixed(2)
                                    }
                                </p>

                            </div>{values.filter(item => !item[0].rimi_price).map(item => {
                                return (<p className="text-red-500">{item[0].name}</p>)
                            })}
                        </div>

                        <div className="bg-white rounded-lg p-5">
                            <div className="flex justify-between my-5">
                                <p className="text-3xl">Barbora</p>
                                <p className="text-2xl">
                                    €
                                    {
                                        values
                                            .filter(item => item[0].barbora_price)
                                            .map(item => item[1] * item[0].barbora_price!)
                                            .reduce((resultItem, currentItem) => resultItem + currentItem, 0)
                                            .toFixed(2)
                                    }
                                </p>

                            </div>
                            {values.filter(item => !item[0].barbora_price).map(item => {
                                return (<p className="text-red-500">{item[0].name}</p>)
                            })}
                        </div>

                        <div className="bg-white rounded-lg p-5">
                            <div className="flex justify-between my-5">
                                <p className="text-3xl">Coop</p>
                                <p className="text-2xl">
                                    €
                                    {
                                        values
                                            .filter(item => item[0].coop_price)
                                            .map(item => item[1] * item[0].coop_price!)
                                            .reduce((resultItem, currentItem) => resultItem + currentItem, 0)
                                            .toFixed(2)
                                    }

                                </p>

                            </div>{values.filter(item => !item[0].coop_price).map(item => {
                                return (<p className="text-red-500">{item[0].name}</p>)
                            })}
                        </div>

                        <div className="bg-white rounded-lg p-5">
                            <div className="flex justify-between my-5">
                                <p className="text-3xl">Selve</p>
                                <p className="text-2xl">
                                    €
                                    {
                                        values
                                            .filter(item => item[0].selver_price)
                                            .map(item => item[1] * item[0].selver_price!)
                                            .reduce((resultItem, currentItem) => resultItem + currentItem, 0)
                                            .toFixed(2)
                                    }
                                </p>
                            </div>
                            {values.filter(item => !item[0].selver_price).map(item => {
                                return (<p className="text-red-500">{item[0].name}</p>)
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
