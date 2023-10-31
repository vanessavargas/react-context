import { Container } from "./Product.styles";
import { memo, useContext } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useShoppingCartContext } from "common/contexts/ShoppingCart";
import { UserContext } from "common/contexts/User";

function Product({ name, photo, id, value, unit }) {
  const {
    shoppingCart,
    addProduct,
    removeProduct,
    valueTotal,
  } = useShoppingCartContext();
  const { balance } = useContext(UserContext);
  const itemInShoppingCart = shoppingCart.find((item) => item.id === id);

  return (
    <Container>
      <div>
        <img src={`/assets/${photo}.png`} alt={`foto de ${name}`} />
        <p>
          {name} - $ {value?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
        <IconButton
          onClick={() => removeProduct(id)}
          disabled={!itemInShoppingCart || itemInShoppingCart.quantity === 0}
          color="secondary"
        >
          <RemoveIcon />
        </IconButton>

        {itemInShoppingCart?.quantity || 0}
        <IconButton
          disabled={valueTotal > balance}
          onClick={() =>
            addProduct({
              name,
              photo,
              id,
              value,
              unit,
            })
          }
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </div>
    </Container>
  );
}

export default memo(Product);
