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

interface Props {
    image: string;
    productName: string;
    rimiPrice: number;
    selverPrice: number;
    coopPrice: number;
    barboraPrice: number;
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
        <div className="w-auto h- object-center">
            <Box>
                <div className="mt-16 border-2 border-orange-500 rounded flex-row flex place-content-center place-items-center space-x-40">
                    <div className="felx-col items-center">
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

                    <div className="pr-10 flex-row space-y-10 text-orange-500">
                        <p className="text-5xl">{props.productName}</p>
                        <p className="text-2xl">Rimi : {props.rimiPrice}</p>
                        <p className="text-2xl">Selver : {props.selverPrice}</p>
                        <p className="text-2xl">Coop : {props.coopPrice}</p>
                        <p className="text-2xl">Barbora : {props.barboraPrice}</p>
                    </div>
                </div>
            </Box>
        </div>
    );
}
