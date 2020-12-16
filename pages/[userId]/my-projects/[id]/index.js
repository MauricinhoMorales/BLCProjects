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
import ProjectSectionsList from '../../../../components/projectSectionsList';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { config } from '..7../../../config/index';
import { useRouter } from 'next/router';

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
  const [teamCreatorName, setTeamCreatorName] = useState('Personal');
  const [memberPermission, setMemberPermission] = useState('edit');
  const Router = useRouter();

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setShow(true);
  });

  useEffect(async () => {
    if (project.creator.creator_id !== user.user.id) {
      try {
        const teamName = await Axios.get(
          `/api/teams/${project.creator.creator_id}`,
          {
            headers: {
              Authorization: user.jwtToken,
            },
          }
        );
        setTeamCreatorName(teamName.data.name);
        for (let i = 0; i < teamName.data.members.length; i++) {
          if (teamName.data.members[i].member_id === user.user.id) {
            setMemberPermission(teamName.data.members[i].permissions);
          }
        }
      } catch (err) {
        console.log(err.response);
      }
    }
  }, []);

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

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return;

    const start = sections[Number(source.droppableId)];
    const end = sections[Number(destination.droppableId)];

    console.log('start', start);
    console.log('end', end);

    if (start.name === end.name) {
      const newList = start.tasks;
      const [reorderedItem] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, reorderedItem);

      let newSections = sections;
      newSections.map((section, index) => {
        if (section.name === start.name) {
          newSections[index].tasks = newList;
        }
      });
      setSections(newSections);
    } else {
      const newStartList = start.tasks.filter(
        (_, index) => index !== source.index
      );
      const newEndList = end.tasks;
      newEndList.splice(destination.index, 0, start.tasks[source.index]);

      let newSections = sections;
      newSections.map((section, index) => {
        if (section.name === start.name) {
          newSections[index].tasks = newStartList;
        }
        if (section.name === end.name) {
          newSections[index].tasks = newEndList;
        }
      });
      setSections(newSections);
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
          <Text color={project.color || 'green.500'}>{teamCreatorName}</Text>
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
                justify="flex-end"
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
              <DragDropContext onDragEnd={handleDragEnd}>
                {sections.map((section, index) => {
                  return (
                    <Droppable droppableId={`${index}`}>
                      {(provided) => (
                        <>
                          <ProjectSectionsList
                            provided={provided}
                            innerRef={provided.innerRef}
                            index={index}
                            memberPermission={memberPermission}
                            sections={sections}
                            setSections={setSections}
                            user={user}
                            section={section}
                            projectId={project._id}
                            color={project.color || 'blue'}
                          />

                          {provided.placeholder}
                        </>
                      )}
                    </Droppable>
                  );
                })}
              </DragDropContext>
              {memberPermission === 'edit' ? (
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
              ) : null}
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
            `${config.url}/api/projects/${context.query.id}/tasks`,
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
        console.log('Task Error', err);
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
    console.log(err);
    return {
      props: {
        isError: true,
        initialUser: user,
        project: { name: '', sections: [], creator: { creator_id: '' } },
      },
    };
  }
}
