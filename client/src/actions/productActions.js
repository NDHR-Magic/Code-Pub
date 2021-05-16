import axios from "axios";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import { getProducts } from "../utils/StoreAPI";

export const getAllProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const data = await getProducts();
        const productInfo = data.data;

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: productInfo });
    } catch (err) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
    }
}