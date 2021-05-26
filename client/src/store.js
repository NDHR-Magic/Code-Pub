import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";
import { cartReducer } from './reducers/cartReducers';
import {
    productDetailsReducer,
    productListReducer
} from './reducers/productReducers';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';
import { getOrdersReducer, orderCreateReducer, orderDetailsReducer, orderPayReducer } from "./reducers/orderReducers";
import { menuGetReducer, createMenuItemReducer } from './reducers/menuReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'PayPal'
    },
    menuList: {
        menu: localStorage.getItem("menuList") ? JSON.parse(localStorage.getItem("menuList")) : {}
    }
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    menuList: menuGetReducer,
    menuItem: createMenuItemReducer,
    ordersList: getOrdersReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;