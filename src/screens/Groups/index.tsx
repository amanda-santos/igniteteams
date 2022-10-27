import { ReactElement, useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  Button,
  GroupCard,
  Header,
  Highlight,
  ListEmpty,
} from "@components/index";
import { getAllGroups } from "@storage/group/getAllGroups";
import { Container } from "./styles";

export const Groups = (): ReactElement => {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  const fetchGroups = async () => {
    try {
      const groups = await getAllGroups();
      setGroups(groups);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNewGroup = () => {
    navigation.navigate("new");
  };

  const handleOpenGroup = (group: string) => {
    navigation.navigate("players", { group });
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header showBackButton />
      <Highlight title="Groups" subtitle="play with your group of friends!" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="How about registering your first group of friends?" />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button title="Create new group" onPress={handleCreateNewGroup} />
    </Container>
  );
};
