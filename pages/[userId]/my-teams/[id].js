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
} from '@chakra-ui/react';
import TeamDetailMemberItem from '../../../components/teamDetailMemberItem';
import { PlusCircle, UserPlus } from 'react-feather';
import TeamProjectListItem from '../../../components/teamProjectListItem';

export default function TeamDetailPage({
  initialUser,
  setUser,
  user,
  setShow,
}) {
  const [team, setTeam] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamProjects, setTeamProjects] = useState([]);
  const [thisMemberPermission, setThisMemberPermission] = useState('edit');
  const [fetchingError, setFechingError] = useState(false);
  const Router = useRouter();

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
    } catch (err) {
      console.log(err);
      setFechingError(true);
    }
  }, []);

  const onClickNewProject = () => {
    Router.replace(`/${user.user.id}/my-projects/new-project`);
  };

  if (fetchingError) {
    return <p>Something was wrong....</p>;
  }

  return (
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
