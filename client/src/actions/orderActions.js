import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants";
import { createOrderAPI } from "../utils/OrderAPI";

export const createOrder = order => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        const { userSignin: { userInfo } } = getState();
        // Create order with backend
        const { data } = await createOrderAPI(order, userInfo);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem("cartItems");
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};