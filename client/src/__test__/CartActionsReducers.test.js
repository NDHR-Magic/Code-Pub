import configureMockStore from "redux-mock-store";
import axios from "axios";
import thunk from "redux-thunk";
import * as cartActions from "../actions/cartActions";
import * as cartReducers from "../reducers/cartReducers";
import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

jest.mock("axios");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;
beforeEach(() => {
    store = mockStore({ userInfo: {} });
    axios.mockClear();
});

describe("Add to cart action", () => {
    it("Should call localStore to store cart information", async () => {
        axios.mockImplementation(() => {
            return Promise.resolve({
                data: {
                    id: 1,
                    name: "Cart item",
                    price: 9.99,
                    amount_in_stock: 2
                }
            });
        });

        const setStuff = jest.spyOn(Storage.prototype, "setItem");
        const dispatch = jest.fn();

        const getState = () => ({
            userSignin: { userInfo: "mock value" },
            cart: { cartItems: ["mock item"] }
        });

        const cb = cartActions.addToCart(1, 3);
        await cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{
            type: CART_ADD_ITEM, payload: {
                "amountInStock": 2,
                "image": undefined,
                "name": "Cart item",
                "price": 9.99,
                "product": 1,
                "qty": 3,
            }
        }]);
        expect(setStuff).toHaveBeenCalledWith("cartItems", "[\"mock item\"]");
    });
});

describe("Remove from cart action", () => {
    it("Should remove items from cart and call local storage", () => {
        const setItem = jest.spyOn(Storage.prototype, "setItem");
        const dispatch = jest.fn();

        const getState = () => ({
            userSignin: { userInfo: "mock value" },
            cart: { cartItems: ["mock item"] }
        });

        const cb = cartActions.removeFromCart(99);
        cb.call(this, dispatch, getState);

        expect(dispatch.mock.calls[0]).toEqual([{ type: CART_REMOVE_ITEM, payload: 99 }]);

        expect(setItem).toHaveBeenCalledWith("cartItems", "[\"mock item\"]");
    });
});

describe("Save shipping info action", () => {
    it("Should dispatch save address event and call local storage", () => {
        store.dispatch(cartActions.saveShippingAddress("name", 1, 2, 3, 4, 5));

        const setItem = jest.spyOn(Storage.prototype, "setItem");

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: CART_SAVE_SHIPPING_ADDRESS, payload: {
                address: 1,
                city: 2,
                country: 5,
                fullName: "name",
                state: 3,
                zipCode: 4,
            }
        });

        expect(setItem).toHaveBeenCalledWith("shippingAddress", "{\"fullName\":\"name\",\"address\":1,\"city\":2,\"state\":3,\"zipCode\":4,\"country\":5}");
    });
});

describe("Save payment method action", () => {
    it("Should save payment info and dispatch event", () => {
        store.dispatch(cartActions.savePaymentMethod("Jest PayPal"));

        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: CART_SAVE_PAYMENT_METHOD, payload: "Jest PayPal" });
    });
});

// Reducers
describe("Cart reducer", () => {
    const initialState = {
        cartItems: [{ product: 1, name: "lame" }, { product: 2, name: "Cool" }]
    }

    it("Should return default state", () => {
        expect(cartReducers.cartReducer(initialState, {})).toEqual(initialState);
    });

    it("Should return state for adding item", () => {
        // If new item, add it to cartItems
        expect(cartReducers.cartReducer(initialState, { type: CART_ADD_ITEM, payload: "new item" })).toEqual({
            ...initialState, cartItems: [{ product: 1, name: "lame" }, { product: 2, name: "Cool" }, "new item"]
        });
        // If item already exists, updates it
        expect(cartReducers.cartReducer(initialState, { type: CART_ADD_ITEM, payload: { product: 1, name: "UpdatedCool" } })).toEqual({
            ...initialState, cartItems: [{ product: 1, name: "UpdatedCool" }, { name: "Cool", product: 2 }]
        });
    });

    it("Should correctly delete cart items and empty cart", () => {
        // Delete item 2 in initial state
        expect(cartReducers.cartReducer(initialState, { type: CART_REMOVE_ITEM, payload: 2 })).toEqual({
            ...initialState, cartItems: [{ product: 1, name: "lame" }]
        });

        expect(cartReducers.cartReducer(initialState, { type: CART_EMPTY })).toEqual({
            cartItems: []
        });
    });

    it("Should save address and payment info", () => {
        expect(cartReducers.cartReducer(initialState, { type: CART_SAVE_SHIPPING_ADDRESS, payload: { address: "123 cool rd" } })).toEqual({
            ...initialState, shippingAddress: { address: "123 cool rd" }
        });

        expect(cartReducers.cartReducer(initialState, { type: CART_SAVE_PAYMENT_METHOD, payload: "Jest PayPal" })).toEqual({
            ...initialState, paymentMethod: "Jest PayPal"
        });
    });
});