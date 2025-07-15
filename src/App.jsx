import { useState } from "react";
import "./App.scss";
import data from "./assets/data";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import { CartProvider } from "./context/cartContext";
import { MenuProvider } from "./context/menuContext";

function App() {
  return (
    <MenuProvider>
      <CartProvider>
        <div>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </MenuProvider>
  );
}

export default App;
