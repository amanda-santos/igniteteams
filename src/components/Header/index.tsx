import { ReactElement } from "react";
import { useNavigation } from "@react-navigation/native";

import logoImg from "@assets/logo.png";
import { BackButton, BackIcon, Container, Logo } from "./styles";

type HeaderProps = {
  showBackButton?: boolean;
};

export const Header = ({
  showBackButton = false,
}: HeaderProps): ReactElement => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("groups");
  };

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  );
};
