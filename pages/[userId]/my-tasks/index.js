import { useEffect } from 'react';
import { Heading, VStack, Flex, Text, Stack, Box } from '@chakra-ui/react';
import Head from 'next/head';
import { parseCookies } from '../../../lib/parseCookies';
import TaskDataView from '../../../components/taskDataView';
import TaskSectionList from '../../../components/taskSectionList';

export default function MyTasksPage({ setUser, initialUser, setShow }) {
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setShow(true);
  });
  return (
    <>
      <Head>
        <title>Mis Tareas - BLCProjects</title>
      </Head>
      <VStack spacing="2em" padding="3em" h="100vh" w="100%" align="start">
        <Heading as="h3" color="richBlack.500">
          Mis Tareas
        </Heading>
        <Stack direction="column" w="100%" spacing="40px">
          <TaskSectionList title="HOY" />
          <TaskSectionList title="PROXIMOS" />
          <TaskSectionList title="PROXIMAMENTE" />
          <Box h="40px" />
        </Stack>
      </VStack>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const userCookie = parseCookies(req);
  const user = JSON.parse(userCookie.user);

  return {
    props: {
      initialUser: user,
    },
  };
}
