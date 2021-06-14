import configureMockStore from "redux-mock-store";
import axios from "axios";
import thunk from "redux-thunk";

jest.mock("axios");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;
beforeEach(() => {
    store = mockStore({ userInfo: {} });
    axios.post.mockClear();
});

describe("Get all products action", () => {

});