import { getProductById } from "../utils/StoreAPI"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";


export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await getProductById(productId);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            amountInStock: data.amount_in_stock,
            product: data.id,
            qty
        }
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = productId => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (fullName, address, city, zipCode, country) => (dispatch) => {
    const data = { fullName, address, city, zipCode, country };

    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}