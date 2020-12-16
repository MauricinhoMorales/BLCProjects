import { useEffect } from 'react';
import Head from 'next/head';
import { Heading, Icon, IconButton, VStack, Flex } from '@chakra-ui/react';
import { Plus } from 'react-feather';
import TeamsListItem from '../../../components/teamsListItem';
import { config } from '../../../config/index';
import { parseCookies } from '../../../lib/parseCookies';
import { useRouter } from 'next/router';
import Axios from 'axios';

export default function MyTeamsPage({
  user,
  setUser,
  initialUser,
  setShow,
  teams,
  users,
  url,
}) {
  const Router = useRouter();

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setShow(true);
  }, []);

  const handleAddTeamClick = () => {
    Router.replace(`/${user.user.id}/my-teams/new-team`);
  };

  return (
    <>
      <Head>
        <title>Mis Equipos - BLCProjects</title>
      </Head>
      <VStack spacing="2em" padding="3em" h="100vh" w="100%" align="start">
        <Heading as="h3" color="richBlack.500">
          Mis Equipos
        </Heading>
        <Flex w="100%" h="100vh" justify="space-between" flexWrap="wrap">
          {teams.map((team) => {
            return (
              <TeamsListItem
                users={users}
                key={team._id}
                url={url}
                jwtToken={user.jwtToken}
                membersCount={team.members.length}
                team={team}
                userId={user.user.id}
              />
            );
          })}
        </Flex>
      </VStack>
      <IconButton
        boxShadow="2px 2px 6px 0px rgba(0, 0, 0, 0.4);"
        position="absolute"
        right="3em"
        bottom="2em"
        isRound
        bg="oldRose.500"
        _hover={{ bg: 'oldRose.600', color: 'gray.200' }}
        size="lg"
        icon={<Icon as={Plus} color="white" w={8} h={8} />}
        onClick={handleAddTeamClick}
      />
    </>
  );
}

export async function getServerSideProps({ req }) {
  const userCookie = parseCookies(req);
  const user = JSON.parse(userCookie.user);
  try {
    const teams = await Axios.get(`${config.url}/api/teams`, {
      params: {
        creator: user.user.id,
        memberId: user.user.id,
      },
      headers: {
        Authorization: user.jwtToken,
      },
    });
    const users = await Axios.get(`${config.url}/api/users`, {
      headers: {
        Authorization: user.jwtToken,
      },
    });
    return {
      props: {
        users: users.data,
        teams: teams.data,
        isError: false,
        initialUser: user,
        url: config.url,
      },
    };
  } catch (err) {
    console.log(err);
    console.log(err.response);
    return {
      props: {
        users: [],
        teams: [],
        isError: true,
        initialUser: user,
        url: config.url,
      },
    };
  }
}
