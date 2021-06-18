import configureMockStore from "redux-mock-store";
import axios from "axios";
import thunk from "redux-thunk";
import * as orderActions from "../actions/orderActions";
import * as orderReducers from "../reducers/orderReducers";
import { GET_ORDERS_FAIL, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../constants/orderConstants";
import { CART_EMPTY } from "../constants/cartConstants";

jest.mock("axios");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;
let dispatch;
let getState;
beforeEach(() => {
    store = mockStore({ userInfo: {} });
    axios.mockReset();

    dispatch = jest.fn();
    getState = () => ({
        userSignin: { userInfo: "mock value" },
    });
});

afterEach(() => dispatch.mockReset());


describe("Fetch all orders action", () => {
    it("Should request all orders and on successful data retreival, dispatch success event", async () => {
        axios.get.mockResolvedValue({
            data: [{ id: 1, isPaid: true, orderItems: [1, 2], total_price: 96.56, shipping_address: { steet: "123 test" } }]
        });

        let cb = orderActions.fetchAllOrders();
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: GET_ORDERS_REQUEST }]);
        expect(dispatch.mock.calls[1]).toEqual([{
            type: GET_ORDERS_SUCCESS, payload: [{ id: 1, isPaid: true, orderItems: [1, 2], total_price: 96.56, shipping_address: { steet: "123 test" } }]
        }]);
        expect(dispatch.mock.calls.length).toBe(2);
    });

    it("Should request and dispatch error on failed data retreival", async () => {
        axios.get.mockImplementation(() => {
            return Promise.reject({ message: "Jest order error" });
        });

        let cb = orderActions.fetchAllOrders();
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: GET_ORDERS_REQUEST }]);
        expect(dispatch.mock.calls[1]).not.toEqual([{
            type: GET_ORDERS_SUCCESS, payload: [{ id: 1, isPaid: true, orderItems: [1, 2], total_price: 96.56, shipping_address: { steet: "123 test" } }]
        }]);
        expect(dispatch.mock.calls[1]).toEqual([{
            type: GET_ORDERS_FAIL, payload: "Jest order error"
        }]);
        expect(dispatch.mock.calls.length).toBe(2);
    });
});

// Action for getting a single order's info
describe("DetailsOrder action", () => {
    it("Should request and dispatch success event on retrieval of data", async () => {
        axios.get.mockResolvedValue({ data: { id: 2, isPaid: false, orderItems: [3, 2], total_price: 55.56, shipping_address: { steet: "123 test 2" } } });

        let cb = orderActions.detailsOrder(2);
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: ORDER_DETAILS_REQUEST, payload: 2 }]);
        expect(dispatch.mock.calls[1]).toEqual([{
            type: ORDER_DETAILS_SUCCESS, payload: { id: 2, isPaid: false, orderItems: [3, 2], total_price: 55.56, shipping_address: { steet: "123 test 2" } }
        }]);
        expect(dispatch.mock.calls.length).toBe(2);
    });

    it("Should request and dispatch fail event on unsuccessful data retrieval", async () => {
        axios.get.mockImplementation(() => {
            return Promise.reject({ message: "Jest failed order details request" });
        });

        let cb = orderActions.detailsOrder(2);
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: ORDER_DETAILS_REQUEST, payload: 2 }]);
        expect(dispatch.mock.calls[1]).not.toEqual([{
            type: ORDER_DETAILS_SUCCESS, payload: { id: 2, isPaid: false, orderItems: [3, 2], total_price: 55.56, shipping_address: { steet: "123 test 2" } }
        }]);
        expect(dispatch.mock.calls[1]).toEqual([{
            type: ORDER_DETAILS_FAIL, payload: "Jest failed order details request"
        }]);
        expect(dispatch.mock.calls.length).toBe(2);
    });
});

// Action to create new orders
describe("CreateOrder actions", () => {
    it("Should request order creation and send success event", async () => {
        axios.post.mockResolvedValue({
            data: { order: { id: 3, isPaid: false, orderItems: [3, 2], total_price: 55.56, shipping_address: { steet: "123 test 3" } } }
        });

        const removeItems = jest.spyOn(Storage.prototype, "removeItem");

        console.log = jest.fn();

        let cb = orderActions.createOrder({ order: "Test" });
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: ORDER_CREATE_REQUEST, payload: { order: "Test" } }]);
        expect(dispatch.mock.calls[1]).toEqual([{
            type: ORDER_CREATE_SUCCESS, payload: { id: 3, isPaid: false, orderItems: [3, 2], total_price: 55.56, shipping_address: { steet: "123 test 3" } }
        }]);
        expect(dispatch.mock.calls[2]).toEqual([{ type: CART_EMPTY }]);
        expect(dispatch.mock.calls.length).toBe(3);
        expect(removeItems).toHaveBeenCalledWith("cartItems");
    });

    it("Should request order create and send failure event if unsuccessful", async () => {
        axios.post.mockImplementation(() => {
            return Promise.reject({ message: "Jest creation error" });
        });

        let cb = orderActions.createOrder({ order: "Test 2" });
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: ORDER_CREATE_REQUEST, payload: { order: "Test 2" } }]);
        expect(dispatch.mock.calls[1]).toEqual([{
            type: ORDER_CREATE_FAIL, payload: "Jest creation error"
        }]);
        expect(dispatch.mock.calls.length).toBe(2);
    });
});

// Action when paying order
describe("PayOrder action", () => {
    it("Should request update of order when paying and send success event", async () => {
        axios.put.mockResolvedValue({ data: { updated: 1 } });

        let cb = orderActions.payOrder({ id: 1 }, { success: true, time: "now" });
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: ORDER_PAY_REQUEST }]);
        expect(dispatch.mock.calls[1]).toEqual([{
            type: ORDER_PAY_SUCCESS, payload: { updated: 1 }
        }]);
        expect(dispatch.mock.calls.length).toBe(2);
    });

    it("Should request update and send failed event when updated is unsuccessful", async () => {
        axios.put.mockImplementation(() => {
            return Promise.reject({ message: "Jest update failure" });
        });

        let cb = orderActions.payOrder({ id: 1 }, { success: true, time: "now" });
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: ORDER_PAY_REQUEST }]);
        expect(dispatch.mock.calls[1]).toEqual([{
            type: ORDER_PAY_FAIL, payload: "Jest update failure"
        }]);
        expect(dispatch.mock.calls.length).toBe(2);
    });
});

// Reducers

// Reducer for getting all orders
describe("Get Orders Reducer", () => {
    const initialState = {};
    const orders = [
        { id: 1, total_price: 55.55, orderItems: [1, 2], isPaid: true, shipping_address: { street: "123 test" } },
        { id: 2, total_price: 76.25, orderItems: [1, 3], isPaid: true, shipping_address: { street: "123 test 2" } },
    ]

    it("Should return the default state", () => {
        expect(orderReducers.getOrdersReducer({}, {})).toEqual(initialState);
    });

    it("Should return the correctly updated states", () => {
        expect(orderReducers.getOrdersReducer(initialState, { type: GET_ORDERS_REQUEST, payload: 1 })).toEqual({
            ...initialState, loading: true
        });
        expect(orderReducers.getOrdersReducer(initialState, { type: GET_ORDERS_SUCCESS, payload: orders })).toEqual({
            ...initialState, loading: false, orders: orders
        });
        expect(orderReducers.getOrdersReducer(initialState, { type: GET_ORDERS_FAIL, payload: "Error Jest" })).toEqual({
            ...initialState, loading: false, error: "Error Jest"
        });
    });
});

// Reducer for getting a single orders details
describe("Order details reducer", () => {
    const initialState = {};
    const order = { id: 1, total_price: 55.55, orderItems: [1, 2], isPaid: true, shipping_address: { street: "123 test" } };

    it("Should return default state", () => {
        expect(orderReducers.orderDetailsReducer({}, { type: "blah" })).toEqual(initialState);
    });

    it("Should return the correctly updated states", () => {
        expect(orderReducers.orderDetailsReducer(initialState, { type: ORDER_DETAILS_REQUEST })).toEqual({
            ...initialState, loading: true
        });
        expect(orderReducers.orderDetailsReducer(initialState, { type: ORDER_DETAILS_SUCCESS, payload: order })).toEqual({
            ...initialState, loading: false, order: order
        });
        expect(orderReducers.orderDetailsReducer(initialState, { type: ORDER_DETAILS_FAIL, payload: "Jest error" })).toEqual({
            ...initialState, loading: false, error: "Jest error"
        });
    });
});

// Reducer for creating a new order
describe("Create Order Reducers", () => {
    const initialState = {};
    const order = { id: 1, total_price: 55.55, orderItems: [1, 2], isPaid: true, shipping_address: { street: "123 test" } };

    it("Should return the default state", () => {
        expect(orderReducers.orderCreateReducer({}, { type: "xdawd" })).toEqual(initialState);
    });

    it("Should return the correctly updated states", () => {
        expect(orderReducers.orderCreateReducer(initialState, { type: ORDER_CREATE_REQUEST })).toEqual({
            ...initialState, loading: true
        });
        expect(orderReducers.orderCreateReducer(initialState, { type: ORDER_CREATE_SUCCESS, payload: order })).toEqual({
            ...initialState, loading: false, order: order, success: true
        });
        expect(orderReducers.orderCreateReducer(initialState, { type: ORDER_CREATE_FAIL, payload: "Jest order failure" })).toEqual({
            ...initialState, loading: false, error: "Jest order failure"
        });
        expect(orderReducers.orderCreateReducer(initialState, { type: ORDER_CREATE_RESET })).toEqual(initialState);
    });
});

// Reducer for paying orders
describe("Order Pay Reducer", () => {
    const initialState = { id: 1, isPaid: false, total_price: 99.99 };
    const updatedState = { id: 1, isPaid: true, total_price: 99.99 };

    it("Should return default state", () => {
        expect(orderReducers.orderPayReducer(initialState, { type: "haha" })).toEqual(initialState);
    });

    it("Should return correctly updates states", () => {
        expect(orderReducers.orderPayReducer(initialState, { type: ORDER_PAY_REQUEST })).toEqual({
            ...initialState, loading: true
        });
        expect(orderReducers.orderPayReducer(initialState, { type: ORDER_PAY_SUCCESS })).toEqual({
            ...initialState, loading: false, success: true
        });
        expect(orderReducers.orderPayReducer(initialState, { type: ORDER_PAY_FAIL, payload: "Jest pay failure" })).toEqual({
            ...initialState, loading: false, error: "Jest pay failure"
        });
        expect(orderReducers.orderPayReducer(initialState, { type: ORDER_PAY_RESET })).toEqual({});
    });
});