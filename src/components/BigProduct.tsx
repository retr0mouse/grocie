import Image from "next/image";
import { useEffect, useState } from "react";
import Barbora from "../images/barbore.png";
import Coop from "../images/cope.png";
import Rimi from "../images/rime.png";
import Selver from "../images/selve.png";
import AddToCartButton from "./AddToCartButton";

interface Props {
    image: string;
    productName: string;
    rimiPrice?: number;
    selverPrice?: number;
    coopPrice?: number;
    barboraPrice?: number;
    onChanged(count: number): void;
    count: number;
}

export default function BigProduct(props: Props) {
    const [counter, setCounter] = useState<number>(props.count);

    useEffect(() => {
        if (typeof counter === 'undefined' || counter < 0) return;
        props.onChanged(counter);
    }, [counter])

    useEffect(() => {
        if (props.count) setCounter(props.count);
    }, [props.count])

    return (
        <div className="flex-col bg-white rounded-lg md:flex-row flex justify-between items-center max-w-4xl w-4/5 md:w-3/5 p-10 place-content-center place-items-center self-center mt-12">
            <div className="flex flex-col justify-center w-full sm:w-2/3">
                <h1 className="md:hidden mb-5 text-2xl font-poppins font-semibold text-slate-700">{props.productName}</h1>
                <div className="relative w-2/3 max-w-xs h-72">
                    <Image
                        alt={"a picture of " + props.productName}
                        src={props.image}
                        fill
                        className='object-contain'
                        sizes="(min-width: 640px) 2/3, 100vw"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center w-full sm:w-2/3">
                <h1 className="hidden md:block mb-5 text-3xl font-poppins font-semibold  text-slate-800">{props.productName}</h1>
                <div className='mb-5 flex flex-col gap-3'>
                    {props.barboraPrice ?
                        <div className="flex justify-between">
                            <Image alt="barbora logo" className="object-contain h-8 w-fit" src={Barbora}></Image>
                            <p className="text-2xl text-orange-500 font-medium">€{props.barboraPrice}</p>
                        </div>
                        : null}
                    {props.rimiPrice ?
                        <div className="flex justify-between">
                            <Image alt="rimi logo" className="object-contain h-6 w-fit" src={Rimi}></Image>
                            <p className="text-2xl text-orange-500 font-medium">€{props.rimiPrice}</p>
                        </div>
                        : null}
                    {props.selverPrice ?
                        <div className="flex justify-between">
                            <Image alt="selver logo" className="object-contain h-6 w-fit" src={Selver}></Image>
                            <p className="text-2xl text-orange-500 font-medium">€{props.selverPrice}</p>
                        </div>
                        : null}
                    {props.coopPrice ?
                        <div className="flex justify-between">
                            <Image alt="coop logo" className="object-contain h-8 w-fit" src={Coop}></Image>
                            <p className="text-2xl text-orange-500 font-medium">€{props.coopPrice}</p>
                        </div>
                        : null}
                </div>
                <div className="w-36">
                    <AddToCartButton
                        counter={counter}
                        onClicked={(counter) => setCounter(counter)}
                    />
                </div>

            </div>
        </div>
    )
}
