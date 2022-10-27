import { ReactElement, useState } from "react";
import { Alert, FlatList } from "react-native";
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
import { addPlayerByGroup } from "@storage/player/addPlayerByGroup";
import { getPlayersByGroup } from "@storage/player/getPlayersByGroup";
import { AppError } from "@utils/AppError";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
};

export const Players = (): ReactElement => {
  const [team, setTeam] = useState("Team A");
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const route = useRoute();

  const { group } = route.params as RouteParams;

  const handleAddPlayer = async () => {
    const trimmedPlayerName = newPlayerName.trim();

    if (trimmedPlayerName.length === 0) {
      return Alert.alert("New Player", "Please, inform the player name");
    }

    const newPlayer = {
      name: trimmedPlayerName,
      team,
    };

    try {
      await addPlayerByGroup(newPlayer, group);
      const players = await getPlayersByGroup(group);

      console.log(players);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("New Player", error.message);
      } else {
        console.log(error);
        Alert.alert(
          "New Player",
          "An error occurred while creating the player. Please try again."
        );
      }
    }
  };

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="add your friends and split the teams"
      />

      <Form>
        <Input
          placeholder="Player's name"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          horizontal
          data={["Team A", "Team B"]}
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
