import { useEffect, useState } from 'react';
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
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import Axios from 'axios';
import Head from 'next/head';
import InContruction from '../../../../components/inConstruction';
import { parseCookies } from '../../../../lib/parseCookies';
import { ChevronDown, Columns, List } from 'react-feather';
<<<<<<< Updated upstream
import ProjectSectionsList from '../../../../components/projectSectionsList';
=======
import { config } from '../../../../config';
import ProjectSectionsList from '../../../../components/projectSectionsList';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
>>>>>>> Stashed changes

export default function ProjectPage({
  initialUser,
  project,
  setUser,
  isError,
  user,
  setShow,
}) {
  const [sections, setSections] = useState(() => {
    return project.sections || [];
  });
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setShow(true);
  });

  const handleNewSection = async (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      try {
        await Axios.post(
          `/api/projects/${project._id}/sections`,
          {
            name: e.target.value,
            tasks: [],
          },
          {
            headers: {
              Authorization: user.jwtToken,
            },
          }
        );
        setSections([...sections, { name: e.target.value, tasks: [] }]);
      } catch (err) {
        console.log(err.response);
      }
      e.target.value = '';
    }
  };

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
              {sections.map((section, index) => {
                return (
                  <ProjectSectionsList
                    index={index}
                    sections={sections}
                    setSections={setSections}
                    user={user}
                    section={section}
                    projectId={project._id}
                    color={project.color || 'blue'}
                  />
                );
              })}
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={ChevronDown} color="gray.500" />}
                />
                <Input
                  border="0"
                  placeholder="Nueva seccion..."
                  fontSize="lg"
                  fontWeight="bold"
                  color="richBlack.500"
                  onKeyUp={handleNewSection}
                />
              </InputGroup>
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
  let project;
  try {
    const response = await Axios.get(
      `${config.url}/api/projects/${context.query.id}`,
      {
        headers: {
          Authorization: user.jwtToken,
        },
      }
    );
    project = response.data;
    let sections = [];
    if (project.sections) {
      try {
        for (let i = 0; i < project.sections.length; i++) {
          const response = await Axios.get(
<<<<<<< Updated upstream
            `http://localhost:3000/api/projects/${context.query.id}/tasks`,
=======
            `${config.url}/api/projects/${context.query.id}/tasks`,
>>>>>>> Stashed changes
            {
              params: {
                sectionName: project.sections[i].name,
              },
              headers: {
                Authorization: user.jwtToken,
              },
            }
          );
          sections.push(response.data);
        }
        project.sections = sections;
      } catch (err) {
        console.log('Task Error', err.response);
      }
    }
    return {
      props: {
        initialUser: user,
        project,
        isError: false,
      },
    };
  } catch (err) {
<<<<<<< Updated upstream
=======
    console.log('Nada ok', err);
>>>>>>> Stashed changes
    return {
      props: {
        isError: true,
        initialUser: user,
        project: { name: '', sections: [], creator: { creator_id: '' } },
      },
    };
  }
}
