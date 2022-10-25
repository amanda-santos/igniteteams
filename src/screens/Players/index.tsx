import { ReactElement } from "react";

import {
  ButtonIcon,
  Filter,
  Header,
  Highlight,
  Input,
} from "@components/index";
import { Container, Form } from "./styles";

export const Players = (): ReactElement => {
  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Group's name"
        subtitle="add your friends and split the teams"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />

        <ButtonIcon icon="add" />
      </Form>

      <Filter title="Team A" isActive />
    </Container>
  );
};
