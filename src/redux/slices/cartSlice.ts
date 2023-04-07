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
        addToCart(state, action: PayloadAction<{title: string, price: number}>) {
            const inputTitle = action.payload.title;
            const inputPrice = action.payload.price;

            const foundProduct = state.find(item => item.title === inputTitle && item.price === inputPrice);
            if (!foundProduct) {
                state.push({
                    title: inputTitle,
                    count: 1,
                    price: inputPrice
                });
            } else {
                foundProduct.count++;
            }
        },
        removeFromCart(state, action: PayloadAction<{title: string, price: number}>) {
            const inputTitle = action.payload.title;
            const inputPrice = action.payload.price;
            const foundProduct = state.find(item => item.title === inputTitle && item.price === inputPrice);
            if (foundProduct) {
                if (foundProduct.count == 0) {
                    const index = state.indexOf(foundProduct);
                    state.slice(index, index + 1);
                }
                foundProduct.count--;
            }
        },
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

export const { setCartState, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
