import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS } from "../constants/orderConstants";
import { createOrderAPI, getOrderInfo, payOrderAPI } from "../utils/OrderAPI";

export const createOrder = order => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        // Get user token for authorization and call createOrderApi to create order in sequelize
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

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    try {
        // Get user token for authorization and call getOrderId to find order
        const { userSignin: { userInfo } } = getState();
        const { data } = await getOrderInfo(orderId, userInfo);

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
};

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = payOrderAPI(order, paymentResult, userInfo);

        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({ type: ORDER_PAY_FAIL, payload: message });
    }
};