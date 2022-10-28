import { ReactElement, useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  Button,
  GroupCard,
  Header,
  Highlight,
  ListEmpty,
  Loading,
} from "@components/index";
import { getAllGroups } from "@storage/group";

import { Container } from "./styles";

export const Groups = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const groups = await getAllGroups();
      setGroups(groups);
    } catch (error) {
      Alert.alert(
        "Groups",
        "It was not possible to load the groups. Please try again."
      );
      console.log(error);
    } finally {
      setIsLoading(false);
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

      {isLoading ? (
        <Loading />
      ) : (
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
      )}

      <Button title="Create new group" onPress={handleCreateNewGroup} />
    </Container>
  );
};
