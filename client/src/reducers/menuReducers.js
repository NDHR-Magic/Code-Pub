import { DELETE_MENU_ITEM_FAIL, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, MENU_CREATE_ITEM_FAIL, MENU_CREATE_ITEM_REQUEST, MENU_CREATE_ITEM_SUCCESS, MENU_ITEM_FAIL, MENU_ITEM_REQUEST, MENU_ITEM_RESET, MENU_ITEM_SUCCESS } from "../constants/menuConstants";

export const menuGetReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_ITEM_REQUEST:
            return { ...state, loading: true };
        case MENU_ITEM_SUCCESS:
            return { ...state, loading: false, menu: action.payload };
        case MENU_ITEM_FAIL:
            return { ...state, loading: false, error: action.payload };
        case MENU_ITEM_RESET:
            localStorage.removeItem("menuList");
            return {};
        default:
            return state;
    }
};

export const createMenuItemReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_CREATE_ITEM_REQUEST:
            return { loading: true };
        case MENU_CREATE_ITEM_SUCCESS:
            return { loading: false, menuItem: action.payload };
        case MENU_CREATE_ITEM_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteMenuItemReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_MENU_ITEM_REQUEST:
            return { loading: true };
        case DELETE_MENU_ITEM_SUCCESS:
            return { loading: false, deletedItem: action.payload };
        case DELETE_MENU_ITEM_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}