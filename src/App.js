import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState(() => {
    return localStorage.getItem("cart") != null
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  });

  console.log("Local", cart, localStorage.getItem("cart"));

  useEffect(() => {
    // if (cart == [] && localStorage.getItem("cart") != null) {
    //   setCart([...JSON.parse(localStorage.getItem("cart"))]);
    //   console.log("gotit");
    // }

    console.log("NEW CART", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = item => {
    setCart([...cart, item]);
  };

  const removeItem = id => {
    // console.log("Remove", item);
    let itmIndx = "";
    for (let x = 0; x < cart.length; x++) {
      if (cart[x].id === id) {
        itmIndx = x;
      }
    }
    console.log("REM", itmIndx, cart);
    cart.splice(itmIndx, 1);
    setCart([...cart]);
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />
          {/* Routes */}
          <Route exact path="/" component={Products} />
          <Route path="/cart" component={ShoppingCart} />
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
