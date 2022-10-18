import { ReactElement } from "react";

import { Button, Header, Highlight, Input } from "@components/index";
import { Container, Content, Icon } from "./styles";

export const NewGroup = (): ReactElement => {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da turma" />

        <Button title="Criar" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  );
};
