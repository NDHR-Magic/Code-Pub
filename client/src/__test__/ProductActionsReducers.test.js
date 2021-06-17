import configureMockStore from "redux-mock-store";
import axios from "axios";
import thunk from "redux-thunk";
import * as productActions from "../actions/productActions";
import * as productReducers from "../reducers/productReducers";
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";

jest.mock("axios");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;
beforeEach(() => {
    store = mockStore({});
    axios.mockClear();
});

describe("Get all products action", () => {
    it("Should request and receive data then dispatch success event", async () => {
        axios.mockResolvedValue({
            data: [{ name: "React Shot Glass", price: 12.99, amount_in_stock: 10 }, { name: "T-shirt", price: 8.99, amount_in_stock: 0 }]
        });

        await store.dispatch(productActions.getAllProducts());

        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: PRODUCT_LIST_REQUEST });
        expect(actions[1]).toEqual({ type: PRODUCT_LIST_SUCCESS, payload: [{ name: "React Shot Glass", price: 12.99, amount_in_stock: 10 }, { name: "T-shirt", price: 8.99, amount_in_stock: 0 }] })
        expect(actions.length).toBe(2);
    });

    it("Should request and send error message on failed request", async () => {
        axios.mockImplementation(() => {
            return Promise.reject({ message: "This is a jest error test" });
        });

        await store.dispatch(productActions.getAllProducts());

        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: PRODUCT_LIST_REQUEST });
        expect(actions[1]).toEqual({ type: PRODUCT_LIST_FAIL, payload: "This is a jest error test" });
        expect(actions.length).toBe(2);
    });
});

describe("Get single product action", () => {
    it("Should request and receive single data object and then dispatch success event", async () => {
        axios.mockResolvedValue({ data: { id: 1, name: "Jest Shot Glass", price: 999.99, amount_in_stock: 999 } });

        await store.dispatch(productActions.getProduct(1));

        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: PRODUCT_DETAILS_REQUEST, payload: 1 });
        expect(actions[1]).toEqual({ type: PRODUCT_DETAILS_SUCCESS, payload: { id: 1, name: "Jest Shot Glass", price: 999.99, amount_in_stock: 999 } });
        expect(actions.length).toBe(2);
    });

    it("Should request and send error message on failed event", async () => {
        axios.mockImplementation(() => {
            return Promise.reject({ message: "Another jest error message" });
        });

        await store.dispatch(productActions.getProduct(1));

        const actions = store.getActions();

        expect(actions[0]).toEqual({ type: PRODUCT_DETAILS_REQUEST, payload: 1 });
        expect(actions[1]).toEqual({ type: PRODUCT_DETAILS_FAIL, payload: "Another jest error message" });
        expect(actions.length).toBe(2);
    });
});

// Reducer function for getAllProducts
describe("Product list reducer", () => {
    const initialState = {};
    const products = [{ name: "React Shot Glass", price: 12.99, amount_in_stock: 10 }, { name: "T-shirt", price: 8.99, amount_in_stock: 0 }];

    it("Should return the default state on invalid events", () => {
        expect(productReducers.productListReducer(initialState, {})).toEqual(initialState);
    });

    it("Should return the correct states on events", () => {
        expect(productReducers.productListReducer(initialState, { type: PRODUCT_LIST_REQUEST })).toEqual({
            ...initialState, loading: true
        });
        expect(productReducers.productListReducer(initialState, { type: PRODUCT_LIST_SUCCESS, payload: products })).toEqual({
            ...initialState, loading: false, products: products
        });
        expect(productReducers.productListReducer(initialState, { type: PRODUCT_LIST_FAIL, payload: "Errors" })).toEqual({
            ...initialState, loading: false, error: "Errors"
        });
    });
});

// Reducer function for getProduct
describe("Product details reducer", () => {
    const initialState = {};
    const product = { id: 1, name: "React Shot Glass", price: 12.99, amount_in_stock: 10 };

    it("Should return the default state on invalid events", () => {
        expect(productReducers.productDetailsReducer({}, {})).toEqual({});
    });

    it("Should return the correct states on events", () => {
        expect(productReducers.productDetailsReducer(initialState, { type: PRODUCT_DETAILS_REQUEST, payload: 1 })).toEqual({
            ...initialState, loading: true
        });
        expect(productReducers.productDetailsReducer(initialState, { type: PRODUCT_DETAILS_SUCCESS, payload: product })).toEqual({
            ...initialState, loading: false, product: product
        });
        expect(productReducers.productDetailsReducer(initialState, { type: PRODUCT_DETAILS_FAIL, payload: "Errors2" })).toEqual({
            ...initialState, loading: false, error: "Errors2"
        });
    });
});