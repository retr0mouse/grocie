import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {Grocery} from "groceries-component";

export interface CartSlice {
    cartState: Map<string, [Grocery, number]>;
}

const initialState: CartSlice = {
    cartState: new Map(),
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartState(state, action: PayloadAction<Map<string, [Grocery, number]>>) {
            state.cartState = action.payload;
        },
        addToCart: {
           reducer(state, action: PayloadAction<string>) {
                console.log('big dick lmao');
           },
           prepare: (productTitle: string, count: number)=> {
               return {
                   payload: productTitle
               };
           }
        }
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.cart,
            };
        },
    },
});

export const { setCartState } = cartSlice.actions;
