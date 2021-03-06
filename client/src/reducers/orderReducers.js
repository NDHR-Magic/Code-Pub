import { GET_ORDERS_FAIL, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { ...state, loading: true };
        case ORDER_CREATE_SUCCESS:
            return { ...state, loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { ...state, loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
};

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { ...state, loading: true };
        case ORDER_PAY_SUCCESS:
            return { ...state, loading: false, success: true };
        case ORDER_PAY_FAIL:
            return { ...state, loading: false, error: action.payload };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};

export const getOrdersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return { loading: true };
        case GET_ORDERS_SUCCESS:
            return { loading: false, orders: action.payload };
        case GET_ORDERS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}