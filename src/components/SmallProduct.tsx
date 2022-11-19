import { Box, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";

interface Props {
    image: string,
    productName: string,
    price: number
}


const themeColor = createTheme({
    palette: {
        primary: {
            main: grey[900]
        },
        secondary: {
            main: '#ff5722',
        },
    }
});

export default function SmallProduct(props: Props) {
    return (
        
            
    <div className="text-center flex-[1_0_15%] w-60 h-[400px] mt-16 border-2 border-orange-500 rounded-2xl flex-col flex">
        <img height={200} width={200} alt={"a picture of " + props.productName} className="mt-4 self-center" src={props.image}></img>
        <p className="self-center text-2xl">{props.productName}</p>
        <div className="mt-auto self-center place-content-center w-3/4">
            <p className="text-orange-700 self-center mb-auto text-3xl font-bold mt-auto">{props.price} EUR</p>
            <div className="flex mb-4 mt-10 place-content-center transition ease-in-out delay-50 hover:bg-orange-400 duration-200 bg-orange-200 border-2 border-orange-500 rounded">
                <button className="text-gray-800 font-bold flex text-xl">Lisa ostukorvi</button>
            </div>
        </div>
        
        
    </div>

        
    )
}