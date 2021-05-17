import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import { getProductById, getProducts } from "../utils/StoreAPI";

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

export const getProduct = (id) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST, payload: id
    });
    try {
        const data = await getProductById(id);
        const product = data.data;

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message :
                err.message
        });
    }
}