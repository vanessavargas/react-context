import { createContext, useContext, useEffect, useState } from "react";
import  usePayment  from "./Payment";
import { UserContext } from "./User";

const ShoppingCartContext = createContext();
ShoppingCartContext.displayName = "ShoppingCart";

export function ShoppingCartProvider({ children }) {
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
        setValueTotal,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCartContext() {
  const {
    shoppingCart,
    setShoppingCart,
    quantityItems,
    setQuantityItems,
    valueTotal,
    setValueTotal,
  } = useContext(ShoppingCartContext);

  const { 
    balance, 
    setBalance 
} = useContext(UserContext);

  const { paymentMethod } = usePayment();

  const changeQuantity = (id, quantity) =>
    shoppingCart.map((item) => {
      if (item.id === id) item.quantity += quantity;
      return item;
    });

  function addProduct(newProduct) {
    const haveProduct = shoppingCart.some((item) => item.id === newProduct.id);
    let newShoppingCart = [...shoppingCart];
    if (!haveProduct) {
      newProduct.quantity = 1;
      newShoppingCart.push(newProduct);
      return setShoppingCart(newShoppingCart);
    }
    newShoppingCart = changeQuantity(newProduct.id, 1);
    setShoppingCart(newShoppingCart);
  }

  function removeProduct(id) {
    const product = shoppingCart.find((item) => item.id === id);
    const lastProduct = product.quantity === 1;
    let newShoppingCart;

    if (lastProduct) {
      newShoppingCart = newShoppingCart.filter((item) => item.id !== id);
      return setShoppingCart(newShoppingCart);
    }
    newShoppingCart = changeQuantity(id, -1);
    setShoppingCart(newShoppingCart);
  }

  function buyProduct() {
    setShoppingCart([]);
    setBalance(balance - valueTotal);
  }

  useEffect(() => {
    let { newQuantity, newTotal } = shoppingCart.reduce(
      (count, newItem) => ({
        newQuantity: count.newQuantity + newItem.quantity,
        newTotal: count.newTotal + (newItem.value * newItem.quantity),
      }),
      { newQuantity: 0, newTotal: 0 });
      setQuantityItems(newQuantity);
      setValueTotal(newTotal * paymentMethod.fees);
  }, [shoppingCart, paymentMethod, setQuantityItems, setValueTotal]);

  return {
    shoppingCart,
    addProduct,
    removeProduct,
    quantityItems,
    valueTotal,
    buyProduct,
  };
}
