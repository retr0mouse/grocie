import Image from 'next/image';
import { useEffect, useState } from "react";
import AddToCartButton from "../components/AddToCartButton";
import NavigationBar from "../components/NavigationBar";
import Barbora from "../images/barbore.png";
import Coop from "../images/cope.png";
import Rimi from "../images/rime.png";
import Selver from "../images/selve.png";
import {GroceryFromDB} from "../server/models/Product";

export default function Basket() {
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState<Map<string, [GroceryFromDB, number]>>(new Map());
    const [hasChanged, setHasChanged] = useState(false);
    let titles: string[] = [];
    let values: [GroceryFromDB, number][] = [];

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
            const allPrices = [item[0].rimi_price ?? 0, item[0].coop_price ?? 0, item[0].barbora_price ?? 0, item[0].selver_price ?? 0];
            currentTotal += item[1] * (allPrices ? Math.min.apply(null, allPrices) : 0);
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
            <div className="flex items-center flex-col gap-3 w-4/5 md:w-3/5 self-center">
                <h1 className="text-4xl font-poppins font-semibold text-slate-800 mb-6 mt-10 self-start">Your Cart</h1>
                {values?.map((item, index) => {
                    return (
                        <div className="flex-col w-full bg-white rounded-lg md:flex-row flex justify-between items-center p-10 place-content-center place-items-center" key={index}>
                            <div className="flex flex-col items-center w-full">
                                <h1 className="md:hidden mb-5 text-2xl font-poppins font-semibold text-slate-700">{item[0].name}</h1>
                                <div className="relative w-2/3 max-w-xs h-72">
                                    <Image
                                        alt={"a picture of " + item[0].name}
                                        src={item[0].product_image}
                                        fill
                                        className='object-contain'
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center w-full sm:w-2/3">
                                <h1 className="hidden md:block mb-5 text-3xl font-poppins font-semibold  text-slate-800">{item[0].name}</h1>
                                <div className='mb-5 flex flex-col gap-3'>
                                    {item[0].barbora_price ?
                                        <div className="flex justify-between">
                                            <Image alt="barbora logo" className="object-contain h-8 w-fit" src={Barbora}></Image>
                                            <p className="text-2xl text-orange-500 font-medium">€{item[0].barbora_price}</p>
                                        </div>
                                        : null}
                                    {item[0].rimi_price ?
                                        <div className="flex justify-between">
                                            <Image alt="rimi logo" className="object-contain h-8 w-fit" src={Rimi}></Image>
                                            <p className="text-2xl text-orange-500 font-medium">€{item[0].rimi_price}</p>
                                        </div>
                                        : null}
                                    {item[0].selver_price ?
                                        <div className="flex justify-between">
                                            <Image alt="rimi logo" className="object-contain h-8 w-fit" src={Selver}></Image>
                                            <p className="text-2xl text-orange-500 font-medium">€{item[0].selver_price}</p>
                                        </div>
                                        : null}
                                    {item[0].coop_price ?
                                        <div className="flex justify-between">
                                            <Image alt="rimi logo" className="object-contain h-8 w-fit" src={Coop}></Image>
                                            <p className="text-2xl text-orange-500 font-medium">€{item[0].coop_price}</p>
                                        </div>
                                        : null}
                                </div>
                                <AddToCartButton
                                    counter={item[1]}
                                    onClicked={(counter) => {
                                        if (counter !== 0) {
                                            setCart(new Map(cart.set(item[0].name, [item[0], counter])))
                                        } else {
                                            cart.delete(item[0].name);
                                            setCart(new Map(cart));
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )
                })}
                <h1 className="text-4xl font-poppins font-semibold text-slate-800 mb-6 mt-10 self-start">Your cart's price</h1>
                    <div className="w-full flex flex-col gap-5">
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

                            </div>
                            {values.filter(item => !item[0].rimi_price).map(item => {
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

                            </div>
                            {values.filter(item => !item[0].coop_price).map(item => {
                                return (<p className="text-red-500">{item[0].name}</p>)
                            })}
                        </div>

                        <div className="bg-white rounded-lg p-5">
                            <div className="flex justify-between my-5">
                                <p className="text-3xl">Selver</p>
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
        </>
    )
}
