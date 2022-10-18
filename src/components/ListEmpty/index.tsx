import { Container, Message } from "./styles";

type ListEmptyProps = {
  message: string;
};

export const ListEmpty = ({ message }: ListEmptyProps) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};
