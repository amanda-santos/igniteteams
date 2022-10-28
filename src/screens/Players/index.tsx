import { ReactElement, useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

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
import { AppError } from "@utils/AppError";
import { addPlayerByGroup } from "@storage/player/addPlayerByGroup";
import { getPlayersByGroupAndTeam } from "@storage/player/getPlayersByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { removePlayerByGroup } from "@storage/player/removePlayerByGroup";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { removeGroupByName } from "@storage/group/removeGroupByName";

type RouteParams = {
  group: string;
};

export const Players = (): ReactElement => {
  const [team, setTeam] = useState("Team A");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const route = useRoute();

  const { group } = route.params as RouteParams;

  const fetchPlayersByTeam = async () => {
    try {
      const playersByTeam = await getPlayersByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Players",
        "It was not possible to load the players. Try again later."
      );
    }
  };

  const onRemoveGroup = async () => {
    try {
      await removeGroupByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Remove Group",
        "An error occurred while removing the group. Please try again."
      );
    }
  };

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

      newPlayerNameInputRef.current?.blur();
      setNewPlayerName("");
      fetchPlayersByTeam();
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

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await removePlayerByGroup(playerName, group);

      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Remove player",
        "An error occurred while removing the player. Please try again."
      );
    }
  };

  const handleRemoveGroup = () => {
    Alert.alert("Remove", "Are you sure you want to remove this group?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onRemoveGroup() },
    ]);
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="add your friends and split the teams"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Player's name"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
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

      <Button
        title="Remove group"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
};
