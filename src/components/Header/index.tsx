import { ReactElement } from "react";
import { Container, Logo } from "./styles";

import logoImg from "@assets/logo.png";

export const Header = (): ReactElement => {
  return (
    <Container>
      <Logo source={logoImg} />
    </Container>
  );
};
