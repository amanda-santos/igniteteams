import { ReactElement } from "react";
import { BackButton, BackIcon, Container, Logo } from "./styles";

import logoImg from "@assets/logo.png";

type HeaderProps = {
  showBackButton?: boolean;
};

export const Header = ({
  showBackButton = false,
}: HeaderProps): ReactElement => {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  );
};
