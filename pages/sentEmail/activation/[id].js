import {
  Heading,
  VStack,
  Text,
  Button,
  Icon,
  HStack,
  Stack,
  useToast,
} from '@chakra-ui/react';
import Axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Send } from 'react-feather';

export default function SentEmailPage({ userId }) {
  const Router = useRouter();
  const toast = useToast();

  const handleSentEmail = async () => {
    try {
      const response = await Axios.post(`/api/email/validationEmail/${userId}`);
      console.log(response.data);
      toast({
        title: 'Exito.',
        message: 'Correo de activacion enviado.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Ha ocurrido un error.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleClick = () => {
    Router.replace('/login');
  };
  return (
    <>
      <Head>
        <title>Correo de Activacion enviado - BLCProjects</title>
      </Head>
      <Stack spacing="2em" w="100%" h="100vh" align="center" justify="center">
        <VStack spacing="8px" align="center" justify="center">
          <Icon as={Send} w={48} h={48} color="tyrianPurple.800" />
          <Heading as="h1" color="rufous.500">
            Correo Enviado
          </Heading>
        </VStack>
        <VStack spacing="8px">
          <Text color="richBlack.500">
            Le hemos enviado un correo de activación de su cuenta.
          </Text>
          <HStack spacing="8px">
            <Text color="richBlack.500">
              ¿No ha recibido el correo de verificación? Recuerde revisar la
              carpeta de Spam o
            </Text>
            <Button
              variant="link"
              color="oldRose.500"
              onClick={handleSentEmail}>
              vuelva a enviar un correo de verificación.
            </Button>
          </HStack>
        </VStack>
        <Button
          bgColor="rufous.500"
          borderRadius="30px"
          marginTop="2em"
          padding="1.5em"
          className="button"
          color="white"
          onClick={handleClick}>
          IR A INICIO DE SESIÓN
        </Button>
      </Stack>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      userId: context.query.id,
    },
  };
}
