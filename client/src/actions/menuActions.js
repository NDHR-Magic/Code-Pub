import { MENU_CREATE_ITEM_FAIL, MENU_CREATE_ITEM_REQUEST, MENU_CREATE_ITEM_SUCCESS, MENU_ITEM_FAIL, MENU_ITEM_REQUEST, MENU_ITEM_RESET, MENU_ITEM_SUCCESS } from "../constants/menuConstants"
import { createDrinkAPI, createFoodAPI, getDrinks, getFood } from "../utils/MenuAPI";

export const getAllMenuItems = () => async (dispatch) => {
    dispatch({ type: MENU_ITEM_REQUEST });
    dispatch({ type: MENU_ITEM_RESET });
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
};

export const createMenuItem = (formData, itemType) => async (dispatch, getState) => {
    dispatch({ type: MENU_CREATE_ITEM_REQUEST });
    const { userSignin: { userInfo } } = getState()
    try {
        let menuItem;
        if (itemType === "food") {
            const { data } = await createFoodAPI(formData, userInfo);
            menuItem = data;
        } else if (itemType === "drink") {
            const { data } = await createDrinkAPI(formData, userInfo);
            menuItem = data;
        }
        dispatch({ type: MENU_CREATE_ITEM_SUCCESS, payload: menuItem });
        dispatch({ type: MENU_ITEM_RESET });
    } catch (error) {
        dispatch({
            type: MENU_CREATE_ITEM_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}