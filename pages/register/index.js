import { Center, Flex, Heading, Box, Image, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import LoginRegisterSlider from '../../components/loginRegisterSlide';
import RegisterForm from '../../components/registerForm';

export default function RegisterPage({ setUser }) {
  return (
    <>
      <Flex w="100%" h="100%">
        <LoginRegisterSlider
          title="¿Ya tienes cuenta?"
          message="Inicia Sesión y Empieza a ser productivo"
          buttonText="Iniciar Sesión"
          route="login"
        />
        <Stack flex={1} padding="2em" spacing="0" align="center">
          <Image
            src="/logo.gif"
            alt="BLCProjects Logo"
            w="18em"
            h="3em"
            alignSelf="start"
          />
          <Center h="100%" w="25em">
            <RegisterForm setUser={setUser} />
          </Center>
        </Stack>
      </Flex>
    </>
  );
}
