import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function LoginRegisterSlide({
  title,
  message,
  buttonText,
  route,
}) {
  const Router = useRouter();

  const handleRoute = (e) => {
    Router.replace(`/${route}`);
  };

  return (
    <Stack
      w="30em"
      h="100vh"
      bg="rufous.500"
      spacing="2em"
      align="center"
      justify="center">
      <Heading as="h3" color="white" size="xl">
        {title}
      </Heading>
      <Text fontSize="lg" padding="0 4.5em" textAlign="center" color="white">
        {message}
      </Text>
      <Button
        variant="outline"
        color="white"
        padding="1.5em 3em"
        borderRadius="30px"
        className="button"
        onClick={handleRoute}>
        {buttonText.toUpperCase()}
      </Button>
    </Stack>
  );
}
