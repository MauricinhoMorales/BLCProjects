import { useEffect } from 'react';
import {
  Heading,
  Flex,
  VStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import Axios from 'axios';
import Head from 'next/head';
import InContruction from '../../../../components/inConstruction';
import { parseCookies } from '../../../../lib/parseCookies';
import { Columns, List } from 'react-feather';

export default function ProjectPage({
  initialUser,
  project,
  setUser,
  isError,
  user,
  setShow,
}) {
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setShow(true);
  });
  return (
    <>
      <Head>
        <title>Mis Projectos - {project.name} - BLCProjects</title>
      </Head>
      <Flex padding="2em" direction="column">
        <VStack
          align="start"
          spacing="5px"
          w="100%"
          flex={1}
          marginBottom="1em">
          <Heading as="h3" fontSize="3xl" color="richBlack.500">
            {project.name}
          </Heading>
          <Text color={project.color || 'green.500'}>
            {project.creator.creator_id === user.user.id
              ? 'Personal'
              : project.creator.creator_id}
          </Text>
        </VStack>
        <Tabs>
          <TabList>
            <Tab
              color="romanSilver.600"
              _selected={{
                color: project.color || 'green.500',
                borderBottomColor: project.color || 'green.500',
              }}>
              Tareas
            </Tab>
            <Tab
              color="romanSilver.600"
              _selected={{
                color: project.color || 'green.500',
                borderBottomColor: project.color || 'green.500',
              }}>
              Cronograma
            </Tab>
            <Tab
              color="romanSilver.600"
              _selected={{
                color: project.color || 'green.500',
                borderBottomColor: project.color || 'green.500',
              }}>
              Incidencias
            </Tab>
            <Tab
              color="romanSilver.600"
              _selected={{
                color: project.color || 'green.500',
                borderBottomColor: project.color || 'green.500',
              }}>
              Documentos
            </Tab>
            <Tab
              color="romanSilver.600"
              _selected={{
                color: project.color || 'green.500',
                borderBottomColor: project.color || 'green.500',
              }}>
              Presupuesto
            </Tab>
          </TabList>
          <TabPanels w="100%" h="100%">
            <TabPanel padding="0" w="100%" h="100%">
              <HStack
                spacing="2px"
                padding="0.5em 0"
                align="center"
                justify="right"
                w="100%">
                <IconButton
                  variant="ghost"
                  icon={<Icon as={List} color="rufous.500" />}
                  isRound
                />
                <IconButton
                  variant="ghost"
                  icon={<Icon as={Columns} color="romanSilver.700" />}
                  isRound
                />
              </HStack>
            </TabPanel>
            <TabPanel w="100%" h="100%">
              <InContruction />
            </TabPanel>
            <TabPanel w="100%" h="100%">
              <InContruction />
            </TabPanel>
            <TabPanel w="100%" h="100%">
              <InContruction />
            </TabPanel>
            <TabPanel w="100%" h="100%">
              <InContruction />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}

export async function getServerSideProps(context) {
  const userCookie = parseCookies(context.req);
  const user = JSON.parse(userCookie.user);
  try {
    const response = await Axios.get(
      `http://localhost:3000/api/projects/${context.query.id}`,
      {
        headers: {
          Authorization: user.jwtToken,
        },
      }
    );
    return {
      props: {
        initialUser: user,
        project: response.data,
        isError: false,
      },
    };
  } catch (err) {
    console.log(err.response);
    return {
      props: {
        isError: true,
        initialUser: user,
        project: null,
      },
    };
  }
}
