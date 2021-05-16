import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";

export const productListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}