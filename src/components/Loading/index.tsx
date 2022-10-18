import { ReactElement } from "react";

import { Container, LoadIndicator } from "@components/Loading/styles";

export const Loading = (): ReactElement => {
  return (
    <Container>
      <LoadIndicator />
    </Container>
  );
};
