import { useContext } from "react";
import { UserContext } from "common/contexts/User";
import { Container, Header, List } from "./Fair.styles";
import NavBar from "./NavBar";
import fair from "./fair.json";
import Product from "components/Product";

function Fair() {
  const { name, balance = 0 } = useContext(UserContext);

  return (
      <Container>
        <NavBar />
        <Header>
          <div>
            <h2> Hi {name} !</h2>
            <h3> Balance: ${balance.toFixed(2)}</h3>
          </div>
          <p>Find the best organic products!</p>
        </Header>
        <List>
          <h2>Products:</h2>
          {fair.map((product) => (
            <Product {...product} key={product.id} />
          ))}
        </List>
      </Container>
  );
}

export default Fair;
