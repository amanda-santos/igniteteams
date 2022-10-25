import { ReactElement } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Groups, NewGroup, Players } from "@screens/index";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = (): ReactElement => {
  return (
    <Navigator>
      <Screen name="groups" component={Groups} />
      <Screen name="new" component={NewGroup} />
      <Screen name="players" component={Players} />
    </Navigator>
  );
};
