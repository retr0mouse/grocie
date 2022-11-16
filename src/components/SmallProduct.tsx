import { Box, Button, createTheme, IconButton, Stack, ThemeProvider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { grey, red } from "@mui/material/colors";
import { useState } from "react";
import Image from "next/image";

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
    const [productCounter, setProductCounter] = useState(0);

    return (
        <div className="">
            <Box>
                <div className="w-60 h-80 mt-16 border-2 border-orange-500 rounded-2xl flex-col flex">
                    <Image width={200} alt={"a picture of " + props.productName} className="self-center" src={props.image}></Image>
                    <p className="ml-7 text-xl">{props.productName}</p>
                    <p className="ml-7 text-xl">{props.price} EUR</p>
                    <div className="w-3/4 self-center transition ease-in-out delay-50 hover:bg-orange-500 duration-200 mt-2 flex bg-orange-400 place-content-center place-items-center border-2 border-orange-500 rounded">
                        <button className="text-xl">Add to Cart</button>
                    </div>
                </div>
            </Box>
        </div>
    )
}