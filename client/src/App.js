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
import ItemDetails from "./pages/ItemDetails";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

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
        <ItemDetails />
      </Route>

      <Route exact path="/menu">
        <Menu />
      </Route>

      <Route exact path="/events">
        <Events />
      </Route>

      <Route exact path="/mixer">
        <DrinkApp />
      </Route>

      <Route exact path="/cart">
        <Cart />
      </Route>

      <Route exact path="/login">
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
