import { getPlayersByGroup } from "./getPlayersByGroup";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { AppError } from "@utils/AppError";

export const addPlayerByGroup = async (
  newPlayer: PlayerStorageDTO,
  group: string
) => {
  try {
    const storedPlayers = await getPlayersByGroup(group);

    const playerAlreadyExists = storedPlayers.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists.length > 0) {
      throw new AppError("This player is already added in a team.");
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
};
