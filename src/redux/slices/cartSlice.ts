import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {Grocery} from "groceries-component";

interface cartItem {
    title: string,
    count: number,
    price: number
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: [] as cartItem[],
    reducers: {
        setCartState(state, action: PayloadAction<cartItem[]>) {
            state = action.payload;
        },
        addToCart: {
           reducer(state, action: PayloadAction<cartItem>) {
                state.push(action.payload);
           },
           prepare: (title: string, count: number, price: number) => {
               return {
                   payload: {
                       title,
                       count,
                       price
                    }
               }
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
