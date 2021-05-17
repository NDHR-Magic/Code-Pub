import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

// Reducer to add items to cart
export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            //Check if item exists in cart
            const existItem = state.cartItems.find(arrItem => arrItem.product === item.product);
            // Replace if exists in cart
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        case CART_REMOVE_ITEM:
            return { ...state, cartItems: state.cartItems.filter(item => item.product !== action.payload) }
        default:
            return state;
    }
}