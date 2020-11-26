import { Heading, Icon, VStack, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AlertOctagon } from 'react-feather';

export default function CodeInvalid() {
  const Router = useRouter();

  const handleClick = () => {
    Router.replace('/login');
  };
  return (
    <VStack align="center" justify="center" w="100%" h="100%" spacing="2em">
      <VStack w="100%" spacing="8px">
        <Icon as={AlertOctagon} w={48} h={48} color="tyrianPurple.800" />
        <Heading as="h1" color="richBlack.500">
          Código Inválido
        </Heading>
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
    </VStack>
  );
}
