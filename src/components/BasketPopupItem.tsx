import { Grocery } from "groceries-component";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
    item: Grocery;
    count: number | undefined;
    onChanged(counter: number): void;
}

export default function BasketPopupItem(props: Props) {
    const [counter, setCounter] = useState<number>(props.count ?? 0);

    useEffect(() => {
        if (counter) props.onChanged(counter);
    }, [counter])

    return (
        <div className='flex items-center bg-white rounded-xl'>
            <Link href={{ pathname: '/product/[name]', query: { name: props.item?.name, product: JSON.stringify(props.item), count: counter } }} as='/product/[name]'>
                <div className='flex items-center  gap-3 mb-2 p-2'>
                    <div className={'block relative'}>
                        <img className={"w-20"} src={props.item.image} />
                        <span className={'absolute bottom-0 right-0 bg-slate-500 w-8 h-8 bg-opacity-85 rounded-full m-0 flex items-center text-center justify-center'}> <p className='text-white'>{counter}</p> </span>
                    </div>
                    <p><span>{props.item.name.length > 25 ? props.item.name.substring(0, 25) + '...' : props.item.name}</span> <span className='flex text-orange-600 font-bold'>{Math.min.apply(null, typeof props.item.allPrices !== 'undefined' ? props.item?.allPrices : [0])} €</span></p>
                </div>
            </Link>
            <div className="mb-4 mt-10 h-8 border-orange-500 border-2 rounded-full justify-between flex flex-row place-content-center place-items-center">
                <button
                    onClick={() => setCounter(counter - 1)}
                    className="ml-0"
                >
                    
                </button>
                <p className="">{counter}</p>
                <button
                    onClick={() => setCounter(counter + 1)}
                    className=""
                >
                </button>
            </div>
        </div>
    );
}