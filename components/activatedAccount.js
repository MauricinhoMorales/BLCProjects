import { Heading, VStack, Text, Button, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ThumbsUp } from 'react-feather';

export default function ActivatedAccount() {
  const Router = useRouter();
  const handleClick = () => {
    Router.replace('/login');
  };
  return (
    <>
      <VStack spacing="8px">
        <Icon as={ThumbsUp} w={48} h={48} color="tyrianPurple.800" />
        <Heading as="h1" color="rufous.500">
          Exito!
        </Heading>
      </VStack>
      <VStack spacing="2px">
        <Text color="richBlack.500">
          Su cuenta BLCProjects ha sido activada.
        </Text>
        <Text color="richBlack.500">
          Inicie Sesión con su nueva cuenta y empiece a ser productivo
        </Text>
      </VStack>
      <Button
        bgColor="rufous.500"
        borderRadius="30px"
        padding="1.5em"
        className="button"
        color="white"
        onClick={handleClick}>
        IR A INICIO DE SESIÓN
      </Button>
    </>
  );
}
