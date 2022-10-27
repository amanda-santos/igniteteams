import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { MainContainer } from "./styles";

export const Routes = () => {
  return (
    <MainContainer>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </MainContainer>
  );
};
