import { Center, Flex, Heading, Box, Image, Stack } from '@chakra-ui/react';
import { useRouter, userRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { config } from '../../config/index';

import LoginRegisterSlider from '../../components/loginRegisterSlide';
import LoginForm from '../../components/loginForm';

export default function LoginPage({ apiToken, setUser, user }) {
  const Router = useRouter();
  useEffect(() => {
    if (user !== null) {
      Router.replace('/:username/my-tasks');
    }
  });
  return (
    <>
      <Flex w="100%" h="100%">
        <Stack flex={1} padding="2em" spacing="0" align="center">
          <Image
            src="/logo.gif"
            alt="BLCProjects Logo"
            w="18em"
            h="3em"
            alignSelf="start"
          />
          <Center h="100%" w="25em">
            <LoginForm apiToken={apiToken} setUser={setUser} />
          </Center>
        </Stack>
        <LoginRegisterSlider
          title="¡Hola! Bienvenido"
          message="Ingresa tu información y comienza tu trabajo con nuestra ayuda"
          buttonText="registrarse"
          route="register"
        />
      </Flex>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      apiToken: config.publicApiKeyToken,
    },
  };
}
