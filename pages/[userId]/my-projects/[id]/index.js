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
  Stack,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import Axios from 'axios';
import Head from 'next/head';
import InContruction from '../../../../components/inConstruction';
import { parseCookies } from '../../../../lib/parseCookies';
import { ChevronDown, Columns, List, Plus } from 'react-feather';
import ProjectSectionsList from '../../../../components/projectSectionsList';
import ProjectSectionsKanbanList from '../../../../components/projectSectionsKanbanList';
import { DragDropContext } from 'react-beautiful-dnd';
import { config } from '..7../../../config/index';
import { useRouter } from 'next/router';

export default function ProjectPage({
  initialUser,
  project,
  setUser,
  isError,
  user,
  setShow,
  members,
}) {
  const [sections, setSections] = useState(() => {
    return project.sections || [];
  });
  const [teamCreatorName, setTeamCreatorName] = useState('Personal');
  const [memberPermission, setMemberPermission] = useState('edit');
  const [isKanban, setKanban] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
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

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleNewSection = async (e) => {
    setLoading(true);
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
    } else if (e.target.localName === 'button') {
      try {
        await Axios.post(
          `/api/projects/${project._id}/sections`,
          {
            name: inputValue,
            tasks: [],
          },
          {
            headers: {
              Authorization: user.jwtToken,
            },
          }
        );
        setSections([...sections, { name: inputValue, tasks: [] }]);
        onClose();
      } catch (err) {
        console.log(err.response);
      }
      setInputValue('');
    }
    setLoading(false);
  };

  const onChangeToList = () => {
    setKanban(false);
  };

  const onChangeToKanban = () => {
    setKanban(true);
  };

  const handleDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return;

    const start = sections[Number(source.droppableId)];
    const end = sections[Number(destination.droppableId)];

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
      let requestSections = newSections.map((newSection) => {
        const tasks = newSection.tasks.map((task) => task._id);
        return { name: newSection.name, tasks };
      });
      try {
        await Axios.put(
          `/api/projects/${project._id}`,
          {
            sections: requestSections,
          },
          {
            headers: {
              Authorization: user.jwtToken,
            },
          }
        );
        setSections(newSections);
      } catch (err) {
        console.log(err.response);
      }
    } else {
      const newStartList = start.tasks.filter(
        (_, index) => index !== source.index
      );
      const newEndList = end.tasks;
      newEndList.splice(destination.index, 0, start.tasks[source.index]);

      let newSections = [];
      sections.map((section) => {
        if (section.name === start.name) {
          newSections.push({ name: section.name, tasks: newStartList });
        } else if (section.name === end.name) {
          newSections.push({ name: section.name, tasks: newEndList });
        } else {
          newSections.push({ name: section.name, tasks: section.tasks });
        }
      });
      setSections(newSections);

      let requestSections = newSections.map((newSection) => {
        const tasks = newSection.tasks.map((task) => task._id);
        return { name: newSection.name, tasks };
      });
      try {
        await Axios.put(
          `/api/projects/${project._id}`,
          {
            sections: requestSections,
          },
          {
            headers: {
              Authorization: user.jwtToken,
            },
          }
        );
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Mis Projectos - {project.name} - BLCProjects</title>
      </Head>
      <Flex
        padding="2em"
        direction="column"
        w={sections.length <= 3 ? '100%' : 'initial'}
        display={!isKanban ? 'block' : 'inline-block'}>
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
                margin="1em 0"
                spacing="2px"
                padding="0.5em 0"
                justify="flex-end"
                w="100%">
                {isKanban ? (
                  <Button
                    variant="primery"
                    color="white"
                    borderRadius="100px"
                    bg={project.color}
                    padding="0.5em 1.5em"
                    onClick={onOpen}
                    leftIcon={<Icon as={Plus} color="white" />}>
                    Agregar Columna
                  </Button>
                ) : null}

                <IconButton
                  variant="ghost"
                  onClick={onChangeToList}
                  icon={
                    <Icon
                      as={List}
                      color={!isKanban ? project.color : 'romanSilver.500'}
                    />
                  }
                  isRound
                />
                <IconButton
                  variant="ghost"
                  onClick={onChangeToKanban}
                  icon={
                    <Icon
                      as={Columns}
                      color={isKanban ? project.color : 'romanSilver.500'}
                    />
                  }
                  isRound
                />
              </HStack>
              <Stack
                spacing="1em"
                dir={!isKanban ? 'column' : 'row'}
                isInline={!isKanban ? false : true}
                align="start"
                justify="start">
                <DragDropContext onDragEnd={handleDragEnd}>
                  {sections.map((section, index) => {
                    return (
                      <>
                        {!isKanban ? (
                          <ProjectSectionsList
                            index={index}
                            memberPermission={memberPermission}
                            sections={sections}
                            setSections={setSections}
                            user={user}
                            section={section}
                            project={project}
                            projectId={project._id}
                            color={project.color}
                            members={members}
                          />
                        ) : (
                          <ProjectSectionsKanbanList
                            index={index}
                            memberPermission={memberPermission}
                            members={members}
                            sections={sections}
                            setSections={setSections}
                            user={user}
                            section={section}
                            project={project}
                            projectId={project._id}
                            color={project.color}
                          />
                        )}
                      </>
                    );
                  })}
                </DragDropContext>
              </Stack>
              {memberPermission === 'edit' && !isKanban ? (
                <InputGroup marginTop="1em">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={ChevronDown} color="gray.500" />}
                  />
                  <Input
                    border="0"
                    placeholder="Nueva sección..."
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nueva Columna</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="0.5em" w="100%" h="100%" align="start">
              <Text fontWeight="bold" color="richBlack.500">
                Nombre de la columna
              </Text>
              <Input
                className="input"
                value={inputValue}
                onChange={onChangeInput}
              />
            </VStack>
          </ModalBody>
          <ModalFooter alignContent="flex-end">
            <Button
              isLoading={loading}
              variant="primary"
              bg="rufous.500"
              color="white"
              borderRadius="100px"
              className="button"
              onClick={handleNewSection}>
              Crear Columna
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export async function getServerSideProps(context) {
  const userCookie = parseCookies(context.req);
  const user = JSON.parse(userCookie.user);
  let project;
  let members = [];
  let sections = [];
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
        console.log(err.response);
      }
    }
    if (project.creator.isTeam) {
      const team = await Axios.get(
        `${config.url}/api/teams/${project.creator.creator_id}`,
        {
          headers: {
            Authorization: user.jwtToken,
          },
        }
      );
      members = team.data.members.map(async (member) => {
        const apiMember = await Axios.get(
          `${config.url}/api/users/${member.member_id}`,
          {
            headers: {
              Authorization: user.jwtToken,
            },
          }
        );
        return apiMember.data;
      });
    }
    return {
      props: {
        initialUser: user,
        members,
        project,
        isError: false,
      },
    };
  } catch (err) {
    console.log(err.response);
    return {
      props: {
        isError: true,
        initialUser: user,
        project: { name: '', sections: [], creator: { creator_id: '' } },
        members: [],
      },
    };
  }
}
