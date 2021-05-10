import React from "react";
import { BrowserRouter as TheCoolestRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Menu from "./pages/Menu";
import Events from "./pages/Events";
import DrinkApp from "./pages/DrinkApp";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
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
    </TheCoolestRouter>
  );
}

export default App;
