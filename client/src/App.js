import React from "react";
import { BrowserRouter as TheCoolestRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Nav from "./components/Nav";

function App() {
  return (
    <TheCoolestRouter>
      <Nav />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/merch">
        <Store />
      </Route>
    </TheCoolestRouter>
  );
}

export default App;
