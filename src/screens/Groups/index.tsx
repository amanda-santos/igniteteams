import { ReactElement, useState } from "react";
import { FlatList } from "react-native";

import {
  Button,
  GroupCard,
  Header,
  Highlight,
  ListEmpty,
} from "@components/index";
import { Container } from "./styles";

export const Groups = (): ReactElement => {
  const [groups, setGroups] = useState([]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />

      <Button title="Criar nova turma" />
    </Container>
  );
};
