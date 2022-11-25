import { Box, createTheme, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Link from "next/link";

interface Props {
    image: string,
    productName: string,
    price: number
}


const Color = createTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: '#ff5722',
        },
    }
});

export default function SmallProduct(props: Props) {
    const [counter, setCounter] = useState(0);
    
    return (
    <div className="shadow-2xl text-center flex-[1_0_15%] w-60 h-[400px] mt-16 border border-orange-500 rounded-2xl flex-col flex">
        <Link href={{pathname: `/product/what`, query: { product: JSON.stringify(props)}}} className="self-center mt-4 place-content-center place-items-center flex flex-col transition ease-in-out delay-50  hover:scale-90  duration-200">
            <img height={230} width={230} alt={"a picture of " + props.productName} className="" src={props.image}></img>
            <p className="font-sans font-semibold">{props.productName}</p>
        </Link>
        
        <div className="mt-auto self-center place-content-center w-3/4">
            <p className="text-orange-700 self-center mb-auto text-3xl font-bold mt-auto">{props.price} 
            <sup>€</sup>
            {/* <sub>€/tk</sub> */}
           
            </p>
            {counter > 0 ? <div className="mb-4 mt-10 h-8 border-orange-500 border-2 rounded-full space-x-16 flex flex-row place-content-center place-items-center">
                <IconButton
                    color="primary"
                    disabled={counter == 0}
                    aria-label="upload picture"
                    component="label"
                    onClick={() => setCounter(counter - 1)}
                    className="ml-0"
                >
                    <RemoveIcon />
                </IconButton>
                <p className="">{counter}</p>
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    onClick={() => setCounter(counter + 1)}
                    className=""
                >
                    <AddIcon />
                </IconButton>
            </div> : <div className="flex mb-4 mt-10 place-content-center transition ease-in-out delay-50 hover:bg-orange-400 duration-200 bg-orange-200 border-2 border-orange-500 rounded">
                <button onClick={() => setCounter(1)} className="text-gray-800 font-bold flex text-xl">Lisa ostukorvi</button>
            </div>}
            
        </div>
        
        
    </div>

        
    )
}