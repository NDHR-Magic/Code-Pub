import { MENU_ITEM_FAIL, MENU_ITEM_REQUEST, MENU_ITEM_SUCCESS } from "../constants/menuConstants";

export const menuGetReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_ITEM_REQUEST:
            return { ...state, loading: true };
        case MENU_ITEM_SUCCESS:
            return { ...state, loading: false, menu: action.payload };
        case MENU_ITEM_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};