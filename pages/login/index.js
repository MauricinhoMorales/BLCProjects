import { Center, Flex, Image, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';
import { config } from '../../config/index';

import LoginRegisterSlider from '../../components/loginRegisterSlide';
import LoginForm from '../../components/loginForm';
import { parseCookies } from '../../lib/parseCookies';

export default function LoginPage({
  apiToken,
  setUser,
  user,
  setShow,
  initialUser,
  teamId,
}) {
  const Router = useRouter();
  useEffect(() => {
    setShow(false);
    if (initialUser) {
      setUser(initialUser);
      if (teamId) {
        Router.replace(`/${initialUser.user.id}/my-teams/${teamId}`);
      } else {
        Router.replace(`/${initialUser.user.id}/my-tasks`);
      }
    }
  });
  return (
    <>
      <Head>
        <title>Iniciar Sesión</title>
      </Head>
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
            <LoginForm
              apiToken={apiToken}
              setUser={setUser}
              setShowNav={setShow}
            />
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

export async function getServerSideProps(context) {
  const userCookie = parseCookies(context.req);
  let user;
  if (!userCookie.user) {
    user = null;
  } else {
    user = JSON.parse(userCookie.user);
  }
  const teamId = context.query.teamId ? context.query.teamId : null;

  return {
    props: {
      apiToken: config.publicApiKeyToken,
      initialUser: user,
      teamId: teamId,
    },
  };
}
