import { ReactElement, useState } from "react";

import {
  ButtonIcon,
  Filter,
  Header,
  Highlight,
  Input,
} from "@components/index";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { FlatList } from "react-native";

export const Players = (): ReactElement => {
  const [team, setTeam] = useState("Team A");
  const [players, setPlayers] = useState([]);

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

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
    </Container>
  );
};
