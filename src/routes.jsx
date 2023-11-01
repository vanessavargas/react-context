import React from "react";
import { ShoppingCartProvider } from "common/contexts/ShoppingCart";
import UserProvider from "common/contexts/User";
import { PaymentProvider } from "common/contexts/Payment";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Fair from "pages/Fair";
import Login from "pages/Login";
import ShoppingCart from "pages/ShoppingCart";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/fair" element={<Fair />} />
            <Route
              path="/shoppingCart"
              element={
                <PaymentProvider>
                  <ShoppingCart />
                </PaymentProvider>
              }
            />
          </Routes>
        </UserProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
