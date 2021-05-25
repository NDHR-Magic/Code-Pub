import { MENU_ITEM_FAIL, MENU_ITEM_REQUEST, MENU_ITEM_SUCCESS } from "../constants/menuConstants"
import { getDrinks, getFood } from "../utils/MenuAPI";

export const getAllMenuItems = () => async (dispatch, getState) => {
    dispatch({ type: MENU_ITEM_REQUEST });
    try {
        const { data: foodData } = await getFood();
        const { data: drinkData } = await getDrinks();

        const data = { food: foodData, drink: drinkData };

        dispatch({ type: MENU_ITEM_SUCCESS, payload: data });
        localStorage.setItem("menuList", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: MENU_ITEM_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}