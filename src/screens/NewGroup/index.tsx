import { ReactElement, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button, Header, Highlight, Input } from "@components/index";
import { createGroup } from "@storage/group/createGroup";
import { AppError } from "@utils/AppError";
import { Container, Content, Icon } from "./styles";

export const NewGroup = (): ReactElement => {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  const handleCreateNewGroup = async () => {
    const trimmedGroup = group.trim();

    try {
      if (trimmedGroup.length === 0) {
        return Alert.alert("New Group", "Please enter a group name.");
      }

      await createGroup(trimmedGroup);
      navigation.navigate("players", { group: trimmedGroup });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("New Group", error.message);
      } else {
        Alert.alert(
          "New Group",
          "An error occurred while creating the group. Please try again."
        );
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="New group"
          subtitle="create a new group to start adding your friends"
        />

        <Input placeholder="Group's name" onChangeText={setGroup} />

        <Button
          title="Create"
          style={{ marginTop: 20 }}
          onPress={handleCreateNewGroup}
        />
      </Content>
    </Container>
  );
};
