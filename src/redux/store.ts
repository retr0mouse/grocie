import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './slices/cartSlice'
import cartReducer from './slices/cartSlice';
// ...
const store = configureStore({
    reducer: {
        cart: cartReducer
    },
})
export type RootState = ReturnType<typeof store.getState>

export default store