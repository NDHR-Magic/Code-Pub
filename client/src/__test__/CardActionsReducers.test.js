import configureMockStore from "redux-mock-store";
import axios from "axios";
import thunk from "redux-thunk";
import * as cartActions from "../actions/cartActions";
import * as cartReducers from "../reducers/cartReducers";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

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