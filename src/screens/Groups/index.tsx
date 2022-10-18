import { ReactElement, useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { Container } from "./styles";

export const Groups = (): ReactElement => {
  const [groups, setGroups] = useState(["Group 1", "Group 2", "Group 3"]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
      />
    </Container>
  );
};
