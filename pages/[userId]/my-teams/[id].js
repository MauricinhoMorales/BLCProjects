import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';

import { parseCookies } from '../../../lib/parseCookies';
import {
  Box,
  Heading,
  VStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
} from '@chakra-ui/react';
import TeamDetailMemberListItem from '../../../components/teamDetailMemberListItem';

export default function TeamDetailPage({
  initialUser,
  setUser,
  user,
  setShow,
}) {
  const [team, setTeam] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [fetchingError, setFechingError] = useState(false);
  const [memberPermission, setMemberPermission] = useState('edit');
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
      console.log(team.data);
      setTeam(team.data);

      const members = await Axios.get(`/api/teams/${Router.query.id}/members`, {
        headers: {
          Authorization: user.jwtToken,
        },
      });
      console.log(members.data);
      setTeamMembers(members.data);

      members.data.map((member) => {
        if (member.member_id === user.user.id) {
          setMemberPermission(member.permissions);
        }
      });
    } catch (err) {
      console.log(err.response);
      setFechingError(true);
    }
  }, []);

  if (fetchingError) {
    return <p>Something was wrong....</p>;
  }

  return (
    <Box padding="2em" w="100%" h="100%">
      <VStack justify="start" align="start" spacing="0.5em">
        <Heading as="h3" fontSize="3xl" color="richBlack.500">
          {team.name}
        </Heading>
        <Text style={{ color: team.color }}>{`${
          team.members && team.members.length
        } ${
          team.members && team.members.length === 1 ? 'miembro' : 'miembros'
        }`}</Text>
        <Tabs w="100%" h="100%">
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
            <TabPanel padding="0" w="100%" h="100%" marginTop="2em">
              <Box
                w="100%"
                borderRadius="10px"
                boxShadow="-2px 2px 8px 2px rgba(0,0,0,0.10)">
                <Flex
                  w="100%"
                  borderRadius="10px 10px 0 0"
                  padding="0.8em 1.5em"
                  bg="gray.200">
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                    color="gray.500"
                    flex={7}>
                    Nombre
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                    color="gray.500"
                    flex={5}>
                    Cargo
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                    color="gray.500"
                    flex={5}>
                    Permisos
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                    color="gray.500"
                    flex={7}>
                    Otros Equipos
                  </Text>
                  <Box w="100%" flex={2} />
                </Flex>
                {teamMembers.map((member) => {
                  return (
                    <TeamDetailMemberListItem
                      member={member}
                      userId={user.user.id}
                      thisMemberPermission={memberPermission}
                    />
                  );
                })}
              </Box>
            </TabPanel>
            <TabPanel padding="0" w="100%" h="100%">
              <Text>Proyectos</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
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
