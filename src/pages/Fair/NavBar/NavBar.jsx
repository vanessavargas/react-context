import { useShoppingCartContext } from "common/contexts/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { Nav } from "./NavBar.styles";
import logo from "assets/logo.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

export default function NavBar() {
  const { quantityItems } = useShoppingCartContext();
  const navigate = useNavigate();

  return (
    <Nav>
      <img src={logo} alt="logotipo da feira" />
      <IconButton
        disabled={quantityItems === 0}
        onClick={() => navigate("/shoppingCart")}
      >
        <Badge color="primary" 
        badgeContent={quantityItems}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  );
}
