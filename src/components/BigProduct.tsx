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
        <div className="items-center mt-16 rounded-lg bg-white p-10 w-auto flex-row flex place-content-center place-items-center self-center">
            <div className="flex-col items-center flex w-60">
                <h1 className="mb-5 text-3xl font-sans font-semibold text-slate-800">{props.productName}</h1>
                <Image
                    alt={"a picture of " + props.productName}
                    src={props.image}
                    width={200}
                    height={200}
                ></Image>
                <AddToCartButton
                    counter={counter}
                    onClicked={(counter) => setCounter(counter)}
                />
            </div>
            <div className="pr-10 flex-col space-y-10 w-[20rem]">
                {props.barboraPrice ? <div className="flex flex-raw items-center">
                    <Image alt="barbora logo" className="w-20 h-8 mr-16 flex" src={Barbora}></Image>
                    <p className="text-2xl text-orange-500 font-medium">€{props.barboraPrice}</p>
                </div> : null}
                {props.rimiPrice ? <div className="flex flex-raw items-center">
                    <Image alt="rimi logo" className="w-auto h-6 mr-16 flex" src={Rimi}></Image>
                    <p className="text-2xl text-orange-500 font-medium">€{props.rimiPrice}</p>
                </div> : null}
                {props.selverPrice ? <div className="flex flex-raw items-center">
                    <Image alt="selver logo" className="w-auto h-6 mr-16 flex" src={Selver}></Image>
                    <p className="text-2xl text-orange-500 font-medium">€{props.selverPrice}</p>
                </div> : null}
                {props.coopPrice ? <div className="flex flex-raw items-center">
                    <Image alt="coop logo" className="-ml-2 w-auto h-8 mr-14 flex" src={Coop}></Image>
                    <p className="text-2xl text-orange-500 font-medium">€{props.coopPrice}</p>
                </div> : null}
            </div>
            <div></div>
        </div>
    )
}
