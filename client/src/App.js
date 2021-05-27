import React from "react";
import { BrowserRouter as TheCoolestRouter, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Menu from "./pages/Menu";
import Events from "./pages/Events";
import DrinkApp from "./pages/DrinkApp";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import ShippingAddress from "./pages/ShippingAddress";
import PaymentMethod from "./pages/PaymentMethod";
import EventDetails from "./pages/EventDetails";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";

function App() {
  return (
    <TheCoolestRouter>
      <Nav />

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/store">
        <Store />
      </Route>

      <Route path="/store/:id">
        <ProductDetails />
      </Route>

      <Route exact path="/cart/:productId" component={Cart} />
      <Route exact path="/cart" component={Cart} />

      <Route path="/shipping" component={ShippingAddress} />
      <Route path="/payment" component={PaymentMethod} />

      <Route exact path="/placeorder" component={PlaceOrder} />

      <PrivateRoute path="/order/:id" component={Order} />

      <Route exact path="/menu">
        <Menu />
      </Route>

      <Route exact path="/events">
        <Events />
      </Route>
      <Route path="/events/:id" component={EventDetails} />

      <Route exact path="/mixer">
        <DrinkApp />
      </Route>

      <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
      <AdminRoute exact path="/admin" component={Admin} />

      <Route path="/login">
        <Login />
      </Route>

      <Route exact path="/about">
        <About />
      </Route>

      <Footer >
        <Link to="/about">About us</Link>
      </Footer>
    </TheCoolestRouter>
  );
}

export default App;
