import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { getAllGroups } from "./getAllGroups";

export const createGroup = async (newGroupName: string) => {
  try {
    const storedGroups = await getAllGroups();

    const groupAlreadyExists = storedGroups.includes(newGroupName);

    if (groupAlreadyExists) {
      throw new AppError(
        "This group already exists. Please choose another name."
      );
    }

    const stringifiedNewGroups = JSON.stringify([
      ...storedGroups,
      newGroupName,
    ]);

    await AsyncStorage.setItem(GROUP_COLLECTION, stringifiedNewGroups);
  } catch (error) {
    throw error;
  }
};
