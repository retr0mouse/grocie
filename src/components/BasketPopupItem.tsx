import { Grocery } from "groceries-component";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
    item: Grocery;
    count: number;
    onChanged(counter: number): void;
}

export default function BasketPopupItem(props: Props) {
    const [counter, setCounter] = useState<number>(props.count ? props.count : 0);

    useEffect(() => {
        props.onChanged(counter);
    }, [counter]);

    return (
        <div className='flex justify-between bg-white rounded-lg my-3 pr-4 transition-all'>
            <Link href={{ pathname: '/product/[name]', query: { name: props.item?.name, product: JSON.stringify(props.item), count: counter } }} as='/product/[name]'>
                <div className='flex items-center gap-3 p-2 group'>
                    <div className={'block relative'}>
                        <img className={'w-16 h-12'} src={props.item.image} />
                        <span className={'absolute bottom-0 right-0 bg-slate-500 w-8 h-8 bg-opacity-85 rounded-full m-0 flex items-center text-center justify-center'}> <p className='text-white'>{counter}</p> </span>
                    </div>
                    <p><span className="text-md font-sans group-hover:text-[#f1bb4e]">{props.item.name.length > 12 ? props.item.name.substring(0, 12) + '...' : props.item.name}</span> <span className='flex text-orange-400 font-bold'>{Math.min.apply(null, typeof props.item.allPrices !== 'undefined' ? props.item?.allPrices : [0])} €</span></p>
                </div>
            </Link>
            <div className="flex flex-row items-center gap-2">
                <button
                    onClick={() => setCounter(counter - 1)}
                    className="transition hover:text-[#f1bb4e] border-2 border-slate-300 bg-slate-200 rounded-md w-10 h-10 text-xl"
                >
                    -
                </button>
                <p className="">{props.count}</p>
                <button
                    onClick={() => setCounter(counter + 1)}
                    className="transition hover:text-[#f1bb4e] border-2 border-slate-300 bg-slate-200 rounded-md w-10 h-10 text-xl"
                >
                    +
                </button>
            </div>
        </div>
    );
}
