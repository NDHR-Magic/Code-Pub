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

        const cb = menuActions.createMenuItem({}, "food");
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: MENU_CREATE_ITEM_REQUEST }]);
        expect(dispatch.mock.calls[1]).toEqual([{
            type: MENU_CREATE_ITEM_SUCCESS, payload: {
                name: "React Burger", price: 19.22
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

        const cb = menuActions.deleteMenuItem(1, "food");
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