import { Button } from '@mui/material';
import {
  Container,
  Title,
  InputContainer
} from './Login.style';
import {
  Input,
  InputLabel,
  InputAdornment 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from 'common/contexts/User';

function Login() {
  const navigate = useNavigate();
  const { name, setName, balance, setBalance } = useContext(UserContext);

  return (
    <Container>
      <Title>
        Enter your name
      </Title>
      <InputContainer>
        <InputLabel>
          Name
        </InputLabel>
        <Input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Balance
        </InputLabel>
        <Input
        value={balance}
        type="number"
        onChange={event => setBalance(Number(event.target.value))}
        startAdornment={
          <InputAdornment position="start">
            $
          </InputAdornment>
        }
      />
      </InputContainer>
      <Button
        variant="contained"
        color="primary"
        disabled={name.length < 4}
        onClick={() => navigate('/fair')}
      >
        Advance
      </Button>
    </Container>
  )
};

export default Login;