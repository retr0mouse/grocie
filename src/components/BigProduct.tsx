import {
    Box,
    Button,
    createTheme,
    IconButton,
    Stack,
    ThemeProvider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { grey, red } from "@mui/material/colors";
import { useState } from "react";
import Image from "next/image";
import Barbora from "../images/barbore.png"
import Rimi from "../images/rime.png"
import Coop from "../images/cope.png"
import Selver from "../images/selve.png"
import { promise } from "zod";

interface Props {
    image: string;
    productName: string;
    rimiPrice?: number;
    selverPrice?: number;
    coopPrice?: number;
    barboraPrice?: number;
}

const themeColor = createTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: "#ff5722",
        },
    },
});

export default function BigProduct(props: Props) {
    const [counter, setCounter] = useState(0);

    return (
        <div className="mt-16 rounded-lg space-x-20 bg-white p-10 w-2/4 flex-row flex place-content-center place-items-center self-center">
            <div className="felx-col ">
                <p>{props.productName}</p>
                <img
                    alt={"a picture of " + props.productName}
                    className=""
                    src={props.image}
                    width={200}
                    height={200}
                ></img>
                <div className="h-10 border-orange-500 border-2 rounded-full space-x-20 flex flex-row place-content-center place-items-center">
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
                </div>
                <div className="transition ease-in-out delay-50  hover:scale-110 duration-200 mt-10 mb-10 flex bg-orange-400 place-content-center place-items-center border-2 border-orange-500 rounded">
                    <button className="text-2xl">Add to Cart</button>
                </div>
            </div>
            <div className="pr-10 flex-col space-y-10 w-[20rem]">
                {props.barboraPrice ? <div className="flex flex-raw items-center">
                    <Image alt="barbora logo" className="w-16 h-6 mr-16 flex" src={Barbora}></Image>
                    <p className="text-2xl text-orange-500 font-medium">{props.barboraPrice}</p>
                </div>: null}
                {props.rimiPrice ? <div className="flex flex-raw items-center">
                    <Image alt="rimi logo" className="w-auto h-6 mr-16 flex" src={Rimi}></Image>
                    <p className="text-2xl text-orange-500 font-medium">{props.rimiPrice}</p>
                </div>: null}
                {props.selverPrice ? <div className="flex flex-raw items-center">
                    <Image alt="rimi logo" className="w-auto h-6 mr-16 flex" src={Selver}></Image>
                    <p className="text-2xl text-orange-500 font-medium">{props.selverPrice}</p>
                </div>: null}
                {props.coopPrice ? <div className="flex flex-raw items-center">
                    <Image alt="rimi logo" className="w-16 h-6 mr-16 flex" src={Coop}></Image>
                    <p className="text-2xl text-orange-500 font-medium">{props.coopPrice}</p>
                </div>: null}
            </div>
        </div>
)}
