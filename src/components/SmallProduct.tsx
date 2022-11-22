import { Box, createTheme, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
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
    const [counter, setCounter] = useState(0);
    
    return (
    <div className="text-center flex-[1_0_15%] w-60 h-[400px] mt-16 border-2 border-orange-500 rounded-2xl flex-col flex">
        <img height={200} width={200} alt={"a picture of " + props.productName} className="mt-4 self-center" src={props.image}></img>
        <p className="self-center text-2xl">{props.productName}</p>
        <div className="mt-auto self-center place-content-center w-3/4">
            <p className="text-orange-700 self-center mb-auto text-3xl font-bold mt-auto">{props.price} EUR</p>
            {counter > 0 ? <div className="mb-4 mt-10 h-8 border-orange-500 border-2 rounded-full space-x-20 flex flex-row place-content-center place-items-center">
                <IconButton
                    color="primary"
                    disabled={counter == 0}
                    aria-label="upload picture"
                    component="label"
                    onClick={() => setCounter(counter - 1)}
                >
                    <RemoveIcon />
                </IconButton>
                <p className="">{counter}</p>
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    onClick={() => setCounter(counter + 1)}
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