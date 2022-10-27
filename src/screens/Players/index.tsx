import { ReactElement, useState } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import {
  Button,
  ButtonIcon,
  Filter,
  Header,
  Highlight,
  Input,
  ListEmpty,
  PlayerCard,
} from "@components/index";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
};

export const Players = (): ReactElement => {
  const [team, setTeam] = useState("Team A");
  const [players, setPlayers] = useState([]);

  const route = useRoute();

  const { group } = route.params as RouteParams;

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="add your friends and split the teams"
      />

      <Form>
        <Input placeholder="Player's name" autoCorrect={false} />

        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          horizontal
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="There's no players in this group" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remove group" type="SECONDARY" />
    </Container>
  );
};
