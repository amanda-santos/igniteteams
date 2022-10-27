import { ReactElement, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Button, Header, Highlight, Input } from "@components/index";
import { Container, Content, Icon } from "./styles";

export const NewGroup = (): ReactElement => {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  const handleCreateNewGroup = () => {
    navigation.navigate("players", { group });
  };

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleCreateNewGroup}
          disabled={!group}
        />
      </Content>
    </Container>
  );
};
