import { createContext, useContext, useEffect, useState } from "react";
import  usePayment  from "./Payment";
import { UserContext } from "./User";

const ShoppingCartContext = createContext();
ShoppingCartContext.displayName = "ShoppingCart";

export const ShoppingCartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, setShoppingCart }}>
      {children}
    </ShoppingCartContext.Provider>
  )
};

export const useShoppingCartContext = () => {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);

  const changeQuantity = (id, quantity) =>
    shoppingCart.map((item) => {
      if (item.id === id) item.quantity += quantity;
      return item;
    });

    
  function addProduct(newProduct) {
    const haveProduct = shoppingCart.some(itemShoppingCart => itemShoppingCart.id === newProduct.id);
    if(!haveProduct) {
      newProduct.quantity = 1;
      return setShoppingCart(previewShoppingCart =>
        [...previewShoppingCart, newProduct]
      )
    }
    setShoppingCart(changeQuantity(newProduct.id, 1));
  }

  function removeProduct(id) {
    const product = shoppingCart.find((item) => item.id === id);
    const lastProduct = product.quantity === 1;

    if (lastProduct) {
      return setShoppingCart(previewShoppingCart => previewShoppingCart.filter(itemShoppingCart =>
        itemShoppingCart.id !== id));
    }
    setShoppingCart(changeQuantity(id, -1));
  }


  return {
    shoppingCart,
    setShoppingCart,
    addProduct,
    removeProduct
  }
}