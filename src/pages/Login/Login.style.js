import styled from "styled-components";
import FormControl from "@mui/material/FormControl";
import Background from "assets/background.jpg";

export const Container = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  padding: 20% 20px;
  min-width: 100vw;
  min-height: 100vh;
  padding-left: 40%;

  @media (min-width: 768px) {
    margin: 0 auto;
    width: 60%;
  }
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  margin-top: 50px;
`;

export const InputContainer = styled(FormControl)`
  margin-bottom: 30px;
`;
