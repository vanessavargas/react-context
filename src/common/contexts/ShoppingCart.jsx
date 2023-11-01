import { createContext, useContext, useEffect, useState } from "react";
import { usePaymentContext } from "./Payment";
import { UserContext } from "./User";

const ShoppingCartContext = createContext();
ShoppingCartContext.displayName = "ShoppingCart";

export const ShoppingCartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [quantityItems, setQuantityItems] = useState(0);
  const [valueTotal, setValueTotal] = useState(0);

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        quantityItems,
        setQuantityItems,
        valueTotal, 
        setValueTotal
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCartContext = () => {
  const {
    shoppingCart,
    setShoppingCart,
    quantityItems,
    setQuantityItems,
    valueTotal, 
    setValueTotal
  } = useContext(ShoppingCartContext);

  const {
    balance,
    setBalance
  } = useContext(UserContext);


  const changeQuantity = (id, quantity) =>
    shoppingCart.map((itemShoppingCart) => {
      if (itemShoppingCart.id === id) itemShoppingCart.quantity += quantity;
      return itemShoppingCart;
    });

  function addProduct(newProduct) {
    const haveProduct = shoppingCart.some(
      (itemShoppingCart) => itemShoppingCart.id === newProduct.id
      );
    let newShoppingCart = [...shoppingCart];

    if (!haveProduct) {
      newProduct.quantity = 1;
      newShoppingCart.push(newProduct);
      return setShoppingCart(newShoppingCart);
    }
    setShoppingCart(changeQuantity(newProduct.id, 1));
  }

  function removeProduct(id) {
    const product = shoppingCart.find(
      (itemShoppingCart) => itemShoppingCart.id === id
    );
    const lastProduct = product.quantity === 1;
    let newShoppingCart;

    if (lastProduct) {
      newShoppingCart = shoppingCart.filter(
          (itemShoppingCart) => itemShoppingCart.id !== id
        )
        return setShoppingCart(newShoppingCart);
    }
    setShoppingCart(changeQuantity(id, -1));
  }

  function buyProduct() {
    setShoppingCart([]);
    setBalance(balance - valueTotal);
  }

  useEffect(() => {
    let { newTotal, newQuantity } = shoppingCart.reduce(
      (count, product) => ({
        newQuantity: count.newQuantity + product.quantity,
        newTotal: count.newTotal + (product.value * product.quantity)
      }),
      {
        newQuantity: 0,
        newTotal: 0,
      }
    );
    setQuantityItems(newQuantity);
    setValueTotal(newTotal
      );
  }, [shoppingCart, setQuantityItems, setValueTotal]);

  return {
    shoppingCart,
    setShoppingCart,
    addProduct,
    removeProduct,
    quantityItems,
    buyProduct,
    valueTotal
  };
};
