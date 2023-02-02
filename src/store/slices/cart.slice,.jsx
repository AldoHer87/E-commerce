import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload;
            return cart;
        } 
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart/', getConfig())
        .then(res => dispatch(setCart(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addCartThunk = (cartAdd) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart/', cartAdd, getConfig())
        .then(res => dispatch(getCartThunk()))
        .catch(() => alert("Hubo un error"))
        .finally(() => dispatch(setIsLoading(false)));
}

export const toPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases/', {}, getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}

// export const deleteProductThunk = () => (dispatch) => {
//     dispatch(setIsLoading(true));
//     return axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/121/`, getConfig() )
//         .then(res => dispatch(getCartThunk()))
//         .finally(() => dispatch(setIsLoading(false)));
// }

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
