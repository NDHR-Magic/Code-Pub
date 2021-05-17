import { getProductById } from "../utils/StoreAPI"
import { CART_ADD_ITEM } from "../constants/cartConstants";


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
}