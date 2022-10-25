import { ReactElement } from "react";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

import { Container } from "./styles";

export const Players = (): ReactElement => {
  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Group's name"
        subtitle="add your friends and split the teams"
      />
    </Container>
  );
};
