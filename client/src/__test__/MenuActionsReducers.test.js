import configureMockStore from "redux-mock-store";
import axios from "axios";
import thunk from "redux-thunk";
import * as menuActions from "../actions/menuActions";
import * as menuReducers from "../reducers/menuReducers";
import { DELETE_MENU_ITEM_FAIL, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, MENU_CREATE_ITEM_FAIL, MENU_CREATE_ITEM_REQUEST, MENU_CREATE_ITEM_SUCCESS, MENU_ITEM_FAIL, MENU_ITEM_REQUEST, MENU_ITEM_RESET, MENU_ITEM_SUCCESS } from "../constants/menuConstants";

jest.mock("axios");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;
beforeEach(() => {
    store = mockStore({ userInfo: {} });
    axios.post.mockClear();
    axios.get.mockClear();
});

describe("Get all menu items action", () => {
    it("Requests and retreives food and drink data", async () => {
        jest.spyOn(localStorage, "setItem");

        axios.mockResolvedValue({
            data: { name: "React Burger", price: 10.99 }
        });

        await store.dispatch(menuActions.getAllMenuItems());

        const actions = store.getActions();
        // Expect menu request, rest, and success types
        expect(actions[0]).toEqual({ type: MENU_ITEM_REQUEST });
        expect(actions[1]).toEqual({ type: MENU_ITEM_RESET });

        // Has duplicate return due to mock just returning the same thing to both the food and drink call
        expect(actions[2]).toEqual({
            type: MENU_ITEM_SUCCESS, payload: {
                "drink": {
                    "name": "React Burger",
                    "price": 10.99,
                },
                "food": {
                    "name": "React Burger",
                    "price": 10.99,
                }
            }
        });
    });

    it("Requests and fails on a bad request", async () => {
        axios.mockImplementation(() => {
            return Promise.reject({ message: "Error" });
        });

        await store.dispatch(menuActions.getAllMenuItems());

        const actions = store.getActions();
        // Expect request and menu fail
        expect(actions[0]).toEqual({ type: MENU_ITEM_REQUEST });
        expect(actions[1]).toEqual({ type: MENU_ITEM_RESET });
        expect(actions[2]).toEqual({ type: MENU_ITEM_FAIL, payload: "Error" });
    });
});

describe("Create menu item action", () => {
    let dispatch;
    let getState;
    beforeEach(() => {
        dispatch = jest.fn();
        console.log = jest.fn();
        getState = () => ({
            userSignin: { userInfo: "mock value" },
        });
    });
    it("Requests to create item and returns successfully", async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ foodData: { name: "React Burger", price: 19.22 } })
            })
        });

        let cb = menuActions.createMenuItem({}, "food");
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: MENU_CREATE_ITEM_REQUEST }]);
        expect(dispatch.mock.calls[1]).toEqual([{
            type: MENU_CREATE_ITEM_SUCCESS, payload: {
                name: "React Burger", price: 19.22
            }
        }]);

        dispatch.mockClear();

        // make sure call works with drink argument passed. Didnt change return info but thats ok
        cb = menuActions.createMenuItem({}, "drink");
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: MENU_CREATE_ITEM_REQUEST }]);
        expect(dispatch.mock.calls[1]).toEqual([{
            type: MENU_CREATE_ITEM_SUCCESS, payload: {
                foodData: {
                    name: "React Burger", price: 19.22
                }
            }
        }]);
    });

    it("Requests to make item and fails with message if status is not ok", async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                // bad status
                ok: false,
                json: () => Promise.resolve({ foodData: { name: "React Burger", price: 19.22 } })
            })
        });

        const cb = menuActions.createMenuItem({}, "food");
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: MENU_CREATE_ITEM_REQUEST }]);
        expect(dispatch.mock.calls[1]).toEqual([{
            type: MENU_CREATE_ITEM_FAIL, payload: "Not unique"
        }]);
    });
});

describe("Menu delete action", () => {
    let getState;
    let dispatch;
    beforeEach(() => {
        getState = () => ({
            userSignin: { userInfo: "mock value" },
        });
        dispatch = jest.fn();
    });

    it("Requests to delete and item and returns successfully", async () => {
        axios.delete.mockResolvedValue({ message: "Succesfully deleted item" });

        let cb = menuActions.deleteMenuItem(1, "food");
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: DELETE_MENU_ITEM_REQUEST }]);
        expect(dispatch.mock.calls[1]).toEqual([{ type: DELETE_MENU_ITEM_SUCCESS, payload: undefined }]);
        expect(dispatch.mock.calls[2]).toEqual([{ type: MENU_ITEM_RESET }]);

        // Test it also works with drink argument
        dispatch.mockClear();

        cb = menuActions.deleteMenuItem(1, "drink");
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: DELETE_MENU_ITEM_REQUEST }]);
        expect(dispatch.mock.calls[1]).toEqual([{ type: DELETE_MENU_ITEM_SUCCESS, payload: undefined }]);
        expect(dispatch.mock.calls[2]).toEqual([{ type: MENU_ITEM_RESET }]);
    });

    it("Requests and fails with bad request", async () => {
        axios.delete.mockImplementation(() => {
            return Promise.reject({ message: "Error" });
        });

        const cb = menuActions.deleteMenuItem(1, "food");
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: DELETE_MENU_ITEM_REQUEST }]);
        expect(dispatch.mock.calls[1]).toEqual([{ type: DELETE_MENU_ITEM_FAIL, payload: "Error" }]);
    });
});

describe("Menu get reducer", () => {
    const initialState = {};
    const menuItems = {
        food: [{ name: "React Burger", price: 9.99 }],
        drink: [{ name: "Mojito" }]
    };

    it("Should return the initial state", () => {
        expect(menuReducers.menuGetReducer(initialState, {})).toEqual(initialState);
    });

    it("Should should correctly return states on request, success, fail, and reset", () => {
        jest.spyOn(localStorage, "removeItem");

        expect(menuReducers.menuGetReducer(initialState, { type: MENU_ITEM_REQUEST })).toEqual({
            ...initialState, loading: true
        });

        expect(menuReducers.menuGetReducer(initialState, { type: MENU_ITEM_SUCCESS, payload: menuItems })).toEqual({
            ...initialState, loading: false, menu: menuItems
        });

        expect(menuReducers.menuGetReducer(initialState, { type: MENU_ITEM_FAIL, payload: "Error" })).toEqual({
            ...initialState, loading: false, error: "Error"
        });

        expect(menuReducers.menuGetReducer(menuItems, { type: MENU_ITEM_RESET })).toEqual(initialState);
    });
});

describe("Menu create reducer", () => {
    const initialState = {};
    const menuItem = {
        name: "React Burger", price: 9.99
    };

    it("Should return default state on wrong dispatch", () => {
        expect(menuReducers.createMenuItemReducer(initialState, {})).toEqual(initialState);
    });

    it("Should return state corrently on request, success, and fail", () => {
        expect(menuReducers.createMenuItemReducer(initialState, { type: MENU_CREATE_ITEM_REQUEST })).toEqual({
            ...initialState, loading: true
        });

        expect(menuReducers.createMenuItemReducer(initialState, { type: MENU_CREATE_ITEM_SUCCESS, payload: menuItem })).toEqual({
            ...initialState, loading: false, menuItem
        });

        expect(menuReducers.createMenuItemReducer(initialState, { type: MENU_CREATE_ITEM_FAIL, payload: "Error" })).toEqual({
            ...initialState, loading: false, error: "Error"
        });
    });
});

describe("Menu delete reducer", () => {
    const initialState = {};
    const deletedItem = 1;

    it("Should return the default state on wrong dispatch type", () => {
        expect(menuReducers.deleteMenuItemReducer(initialState, {})).toEqual(initialState);
    });

    it("Should return the state correctly on requests, success, and fails", () => {
        expect(menuReducers.deleteMenuItemReducer(initialState, { type: DELETE_MENU_ITEM_REQUEST })).toEqual({
            ...initialState, loading: true
        });

        expect(menuReducers.deleteMenuItemReducer(initialState, { type: DELETE_MENU_ITEM_SUCCESS, payload: deletedItem })).toEqual({
            ...initialState, loading: false, deletedItem
        });

        expect(menuReducers.deleteMenuItemReducer(initialState, { type: DELETE_MENU_ITEM_FAIL, payload: "Error" })).toEqual({
            ...initialState, loading: false, error: "Error"
        });
    });
});