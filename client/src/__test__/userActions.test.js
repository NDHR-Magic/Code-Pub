import configureMockStore from "redux-mock-store";
import axios from "axios";
import thunk from "redux-thunk";
import * as userActions from "../actions/userActions";
import * as userReducer from "../reducers/userReducers";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants";

jest.mock("axios");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("User actions", () => {
    const localStorageMock = jest.spyOn(localStorage, "setItem");
    let store;
    beforeEach(() => {
        store = mockStore({ userInfo: {} });
        axios.post.mockClear();
    });

    // Test userActions to signin successfully
    it("Fires a login request action and returns data", async () => {
        axios.post.mockResolvedValue({
            data: { userInfo: { id: 1, username: "JestIsCool123", email: "test", token: "token123" } }
        });

        await store.dispatch(userActions.signin("email@test.com", "pass"));

        const actions = store.getActions();
        // expect actions to incude a USER_SIGNIN_REQUEST and USER_SIGNIN_SUCCESS along with the mocked data
        expect(actions[0]).toEqual({ type: "USER_SIGNIN_REQUEST" });
        expect(actions[1]).toEqual({ payload: { "userInfo": { "email": "test", "id": 1, "token": "token123", "username": "JestIsCool123" } }, "type": "USER_SIGNIN_SUCCESS" })
    });

    // Test userActions for failing signin
    it("Fires a login request action and should fail on bad request", async () => {
        axios.post.mockImplementation(() => {
            return Promise.reject({ message: "error" });
        });

        await store.dispatch(userActions.signin("email@test.com", "pass"));

        const actions = store.getActions();
        // expect actions to incude a USER_SIGNIN_REQUEST and USER_SIGNIN_FAIL along with the message
        expect(actions[0]).toEqual({ type: USER_SIGNIN_REQUEST });
        expect(actions[1]).toEqual({ type: USER_SIGNIN_FAIL, payload: 'error' });
    });

    // Test userActions for registering
    it("Fires a register request successfully", async () => {
        axios.post.mockResolvedValue({
            data: { userInfo: { id: 1, username: "JestIsCool123", email: "test", token: "token123" } }
        });

        await store.dispatch(userActions.register("fName", "lName", "username", "email@mail.com", "pass"));

        const actions = store.getActions();
        // expect actions to include a register request and register success
        expect(actions[0]).toEqual({ type: USER_REGISTER_REQUEST });
        expect(actions[1]).toEqual({ type: USER_REGISTER_SUCCESS, payload: { "userInfo": { "email": "test", "id": 1, "token": "token123", "username": "JestIsCool123" } } });
    });

    it("Fails register request on bad info", async () => {
        axios.post.mockImplementation(() => {
            return Promise.reject({ message: "error" });
        });

        await store.dispatch(userActions.register("fName", "lName", "username", "email@mail.com", "pass"));

        const actions = store.getActions();
        // Expect actions to include register request and fail with message
        expect(actions[0]).toEqual({ type: USER_REGISTER_REQUEST });
        expect(actions[1]).toEqual({ type: USER_REGISTER_FAIL, payload: "error" });
    });

    it("Logout action dispatchhs logout event", () => {
        jest.spyOn(localStorage, "removeItem");

        store.dispatch(userActions.signout());

        const actions = store.getActions();
        // Expect actions to contain signout
        expect(actions[0]).toEqual({ type: USER_SIGNOUT });
    });
});

describe("User Reducers", () => {
    const initialState = {};
    const loggedInState = {
        id: 1,
        name: "cool",
        email: "test@mail.com",
        token: "token123"
    };

    it("User signin reducer returns the initial state", () => {
        // Test that the reducer returns the initial state if type is not listed
        expect(userReducer.userSigninReducer(undefined, { type: "None Listed" })).toEqual(initialState);
    });

    it("User signin reducer handles login request, success, and fail", () => {
        expect(userReducer.userSigninReducer(initialState, { type: USER_SIGNIN_REQUEST })).toEqual({
            ...initialState, loading: true
        });

        expect(userReducer.userSigninReducer(initialState, { type: USER_SIGNIN_SUCCESS, payload: loggedInState })).toEqual({
            ...initialState, loading: false, userInfo: loggedInState
        });

        expect(userReducer.userSigninReducer(initialState, { type: USER_SIGNIN_FAIL, payload: "Error" })).toEqual({
            ...initialState, loading: false, error: "Error"
        });
    });

    it("User register returns initial state on wrong type", () => {
        expect(userReducer.userRegisterReducer(initialState, {})).toEqual(initialState);
    });

    it("User register handles register request, success, and fail", () => {
        expect(userReducer.userRegisterReducer(initialState, { type: USER_REGISTER_REQUEST })).toEqual({
            ...initialState, loading: true
        });

        expect(userReducer.userRegisterReducer(initialState, { type: USER_REGISTER_SUCCESS, payload: loggedInState })).toEqual({
            ...initialState, loading: false, userInfo: loggedInState
        });

        expect(userReducer.userRegisterReducer(initialState, { type: USER_REGISTER_FAIL, payload: "Error" })).toEqual({
            ...initialState, loading: false, error: "Error"
        });
    });

    it("Log out clears state when signout type is called", () => {
        // Should be an empty object for state when signout dispatch is called
        expect(userReducer.userSigninReducer(loggedInState, { type: USER_SIGNOUT })).toEqual({});
    });
});