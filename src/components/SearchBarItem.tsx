import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { Grocery } from "groceries-component";
import Link from "next/link";
import { useEffect, useState } from "react";


interface Props {
    item: Grocery;
}

export default function SearchBarItem(props: Props) {
    return (
        <div className='flex items-center bg-white rounded-xl'>
            <Link href={{ pathname: '/product/[name]', query: { name: props.item?.name, product: JSON.stringify(props.item)} }} as='/product/[name]'>
                <div className='flex items-center  gap-3 mb-2 p-2'>
                    <div className={'block relative'}>
                        <img className={"w-20"} src={props.item.image} />
                    </div>
                    <p><span>{props.item.name.length > 25 ? props.item.name.substring(0, 25) + '...' : props.item.name}</span> <span className='flex text-orange-600 font-bold'>{Math.min.apply(null, typeof props.item.allPrices !== 'undefined' ? props.item?.allPrices : [0])} €</span></p>
                </div>
            </Link>
        </div>
    );
}
