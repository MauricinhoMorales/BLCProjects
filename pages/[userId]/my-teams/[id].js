import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';

import { parseCookies } from '../../../lib/parseCookies';
import {
  Heading,
  HStack,
  VStack,
  Text,
  TabList,
  TabPanels,
  Tabs,
  Tab,
  TabPanel,
  Box,
  Flex,
  SimpleGrid,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spacer,
  Input,
  Wrap,
  Badge,
  WrapItem,
  Avatar,
  CloseButton,
  useToast,
} from '@chakra-ui/react';
import TeamDetailMemberItem from '../../../components/teamDetailMemberItem';
import { PlusCircle, UserPlus } from 'react-feather';
import TeamProjectListItem from '../../../components/teamProjectListItem';
import Autosuggest from 'react-autosuggest';
import theme from '../../../styles/suggestionTheme.module.css';
import SuggestionItem from '../../../components/suggestionItem';
import { config } from '../../../config/index';

export default function TeamDetailPage({
  initialUser,
  setUser,
  user,
  setShow,
  users,
}) {
  const [team, setTeam] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamProjects, setTeamProjects] = useState([]);
  const [thisMemberPermission, setThisMemberPermission] = useState('edit');
  const [fetchingError, setFechingError] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionValue, setSuggestionValue] = useState('');
  const [newMembers, setNewMembers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const Router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setShow(true);
  });

  useEffect(async () => {
    try {
      const team = await Axios.get(`/api/teams/${Router.query.id}`, {
        headers: {
          Authorization: user.jwtToken,
        },
      });
      setTeam(team.data);
      const members = await Axios.get(`/api/teams/${Router.query.id}/members`, {
        headers: {
          Authorization: user.jwtToken,
        },
      });
      setTeamMembers(members.data);
      members.data.map((member) => {
        if (member.member_id === user.user.id) {
          setThisMemberPermission(member.permissions);
        }
      });
      let projects = [];
      for (let i = 0; i < team.data.projects.length; i++) {
        const project = await Axios.get(
          `/api/projects/${team.data.projects[i]}`,
          {
            headers: {
              Authorization: user.jwtToken,
            },
          }
        );
        projects.push(project.data);
      }
      setTeamProjects(projects);

      const myUsers = users.filter((user) => {
        let isMember = false;
        for (let i = 0; i < team.data.members.length; i++) {
          if (user._id === team.data.members[i].member_id) {
            isMember = true;
            break;
          }
        }
        if (!isMember) {
          return user;
        }
      });
      setInvitedUsers(myUsers);
    } catch (err) {
      console.log(err.response);
      setFechingError(true);
    }
  }, []);

  const onClickNewProject = () => {
    Router.replace(`/${user.user.id}/my-projects/new-project`);
  };

  const onOpenInviteModal = () => {
    setInviteModalOpen(true);
  };

  const onCloseInviteModal = () => {
    setInviteModalOpen(false);
  };
  const addMember = (newMember) => {
    let isAlreadyAdded = false;
    newMembers.map((member) => {
      if (newMember._id === member._id) {
        isAlreadyAdded = true;
      }
    });
    if (!isAlreadyAdded) {
      setNewMembers([...newMembers, newMember]);
    }
  };

  const removeMember = (oldMember) => {
    const members = newMembers.filter((member) => member._id !== oldMember._id);
    setNewMembers(members);
  };

  const inviteMembers = async () => {
    try {
      await Axios.post(
        `/api/email/sendInvitations`,
        {
          members: newMembers,
          teamId: team._id,
        },
        {
          headers: {
            Authorization: user.jwtToken,
          },
        }
      );
      toast({
        position: 'top',
        status: 'success',
        title: 'Exito.',
        description: 'Invitaciones Enviadas',
        isClosable: true,
        duration: 5000,
      });
    } catch (err) {
      console.log(err.response);
      toast({
        position: 'top',
        status: 'error',
        title: 'Error.',
        description: 'Ha ocurrido un error intentado enviar las invitaciones',
        isClosable: true,
        duration: 5000,
      });
    }
    onCloseInviteModal();
  };

  if (fetchingError) {
    return <p>Something was wrong....</p>;
  }

  //Autosuggest Settings
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : invitedUsers.filter(
          (user) =>
            `${user.firstName} ${user.lastName}`
              .toLowerCase()
              .slice(0, inputLength) === inputValue ||
            user.email.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const renderSuggestion = (suggestion) => <SuggestionItem user={suggestion} />;
  const getSuggestionValue = (suggestion) => {
    addMember(suggestion);
    return '';
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setSuggestionValue(newValue);
  };

  const renderInputComponent = (inputProps) => (
    <Input {...inputProps} type="text" w="100%" className="input" />
  );

  const inputProps = {
    placeholder: 'Escriba un nombre o correo electrónico...',
    value: suggestionValue,
    onChange,
  };

  return (
    <>
      <VStack spacing="0.5em" padding="2em" align="start">
        <Heading as="h3" fontSize="3xl" color="richBlack.500">
          {team.name}
        </Heading>
        <Text style={{ color: team.color }}>{`${teamMembers.length} ${
          teamMembers.length === 1 ? 'miembro' : 'miembros'
        }`}</Text>
        <Tabs w="100%">
          <TabList>
            <Tab
              color="romanSilver.600"
              _selected={{ color: team.color, borderBottomColor: team.color }}>
              Miembros
            </Tab>
            <Tab
              color="romanSilver.600"
              _selected={{ color: team.color, borderBottomColor: team.color }}>
              Proyectos
            </Tab>
          </TabList>
          <TabPanels w="100%" h="100%">
            <TabPanel marginTop="2em" padding="0">
              <HStack
                w="100%"
                spacing="0"
                justify="end"
                align="end"
                marginBottom="2em">
                <Button
                  padding="0.5em 1.5em"
                  borderRadius="100px"
                  bg={team.color}
                  onClick={onOpenInviteModal}
                  color="white"
                  _hover={{ filter: 'saturate(70%)' }}
                  leftIcon={<Icon as={UserPlus} color="white" />}>
                  Invitar miembro
                </Button>
              </HStack>

              <Box
                borderRadius="10px"
                w="100%"
                boxShadow="-2px 2px 8px 2px rgba(0,0,0,0.10)">
                <Flex
                  w="100%"
                  padding="0.8em 1.5em"
                  borderRadius="10px 10px 0 0"
                  bg="gray.200">
                  <Heading
                    as="h5"
                    fontSize="sm"
                    fontWeight="bold"
                    color="gray.500"
                    flex={8}>
                    Nombre
                  </Heading>
                  <Heading
                    as="h5"
                    fontSize="sm"
                    fontWeight="bold"
                    color="gray.500"
                    flex={5}>
                    Cargo
                  </Heading>
                  <Heading
                    as="h5"
                    fontSize="sm"
                    fontWeight="bold"
                    color="gray.500"
                    flex={5}>
                    Permisos
                  </Heading>
                  <Heading
                    as="h5"
                    fontSize="sm"
                    fontWeight="bold"
                    color="gray.500"
                    flex={8}>
                    Otros Equipos
                  </Heading>
                  <Box w="100%" flex={2}></Box>
                </Flex>
                {teamMembers.map((member) => {
                  return (
                    <TeamDetailMemberItem
                      users={users}
                      invitedUsers={invitedUsers}
                      setInvitedUsers={setInvitedUsers}
                      teamMembers={teamMembers}
                      setTeamMembers={setTeamMembers}
                      teamId={team._id}
                      jwtToken={user.jwtToken}
                      member={member}
                      thisMemberPermission={thisMemberPermission}
                    />
                  );
                })}
              </Box>
            </TabPanel>
            <TabPanel marginTop="2em" padding="">
              <SimpleGrid columns={2} spacing="2em">
                {teamProjects.map((project) => (
                  <TeamProjectListItem
                    project={project}
                    teamProjects={teamProjects}
                    jwtToken={user.jwtToken}
                    userId={user.user.id}
                    setTeamProjects={setTeamProjects}
                  />
                ))}

                {thisMemberPermission === 'edit' ? (
                  <Button
                    variant="ghost"
                    w="100%"
                    padding="4em"
                    border="1px"
                    borderRadius="10px"
                    borderColor="romanSilver.400"
                    onClick={onClickNewProject}>
                    <VStack spacing="0.5em" w="100%" h="100%" justify="center">
                      <Text color="romanSilver.400">Crear Proyecto</Text>
                      <Icon
                        as={PlusCircle}
                        w={35}
                        h={35}
                        color="romanSilver.400"
                      />
                    </VStack>
                  </Button>
                ) : null}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
      <Modal
        motionPreset="scale"
        size="xl"
        isOpen={inviteModalOpen}
        onClose={onCloseInviteModal}
        closeOnOverlayClick={false}
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invitar Miembros a {team.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="0.5em" w="100%" justify="start" align="start">
              <Heading
                as="h5"
                color="richBlack.500"
                fontSize="md"
                fontWeight="bold">
                Agregar miembro
              </Heading>
              <Autosuggest
                theme={theme}
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                renderInputComponent={renderInputComponent}
              />
              <Heading
                paddingTop="1.5em"
                as="h5"
                color="richBlack.500"
                fontSize="md"
                fontWeight="bold">
                Miembros agregados
              </Heading>
              <Wrap
                padding="0.5em"
                w="100%"
                borderRadius="10px"
                className="input">
                {newMembers.map((member) => (
                  <WrapItem>
                    <Badge bg="blue.400" padding="0.5em" borderRadius="100px">
                      <HStack spacing="0.5em">
                        <Avatar
                          color="white"
                          name={`${member.firstName} ${member.lastName}`}
                          size="sm"
                        />
                        <Text
                          color="white"
                          fontSize="sm">{`${member.firstName} ${member.lastName}`}</Text>
                        <CloseButton
                          size="sm"
                          color="white"
                          onClick={() => removeMember(member)}
                        />
                      </HStack>
                    </Badge>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%">
              <Button
                colorScheme="gray"
                onClick={onCloseInviteModal}
                borderRadius="100px">
                Cancel
              </Button>
              <Spacer />
              <Button
                bg={team.color}
                _hover={{ filter: 'saturate(70%)' }}
                color="white"
                onClick={inviteMembers}
                borderRadius="100px">
                Invitar Miembros
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const userCookie = parseCookies(req);
  const user = JSON.parse(userCookie.user);

  try {
    const users = await Axios.get(`${config.url}/api/users`, {
      headers: {
        Authorization: user.jwtToken,
      },
    });
    return {
      props: {
        initialUser: user,
        users: users.data,
      },
    };
  } catch (err) {
    console.log(err.respose);
    return {
      props: {
        initialUser: user,
        users: [],
      },
    };
  }
}
