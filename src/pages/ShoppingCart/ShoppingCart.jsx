import { Button, MenuItem, Select, Snackbar, InputLabel, Alert } from "@mui/material";
import { useShoppingCartContext } from "common/contexts/ShoppingCart";
import Product from "components/Product";
import { useContext, useMemo, useState } from "react";
import {
  Container,
  ToGoBack,
  TotalContainer,
  PaymentContainer,
} from "./ShoppingCart.style";
import { useNavigate } from "react-router-dom";
import { UserContext } from "common/contexts/User";
import { usePayment } from "common/contexts/Payment";

function ShoppingCart() {
  const {
    shoppingCart,
    quantityItems,
    buyItems,
  } = useShoppingCartContext();

  const { balance = 0} = useContext(UserContext);

  const { 
    paymentMethod,
    changePaymentMethod,
    typesPayment
  } = usePayment();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const total = useMemo(() => balance, valueTotal, [balance, valueTotal]);

  return (
    <Container>
      <ToGoBack onClick={navigate} />
      <h2>Shopping Cart</h2>
      {shoppingCart.map((product) => (
        <Product
        {...product}
        key={product.id}
       />
      ))}
      <PaymentContainer>
        <InputLabel>Form of payment</InputLabel>
        <Select
        value={paymentMethod.id}
        onChange={(event) => changePaymentMethod(event.target.value)}
        >
          {typesPayment.map(payment => (
            <MenuItem
            value={payment.id}
            key={payment.id}
            >
              {payment.name}
            </MenuItem>
          ))}
        </Select>
      </PaymentContainer>
      <TotalContainer>
        <div>
          <h2>Total in Shopping Cart</h2>
          <span>$ {valueTotal.toFixed(2)}</span>
        </div>
        <div>
          <h2>Balance:</h2>
          <span>$ {balance.toFixed(2)}</span>
        </div>
        <div>
          <h2>Total balance:</h2>
          <span>$ {total.toFixed(2)}</span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          buyItems();
          setOpenSnackbar(true);
        }}
        disabled={quantityItems === 0 || total < 0}
        color="primary"
        variant="contained"
      >
        Buy
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Purchase made successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ShoppingCart;
