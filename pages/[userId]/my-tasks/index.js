import { useEffect, useState } from 'react';
import { Heading, VStack, Flex, Text, Stack, Box } from '@chakra-ui/react';
import Head from 'next/head';
import { parseCookies } from '../../../lib/parseCookies';
import TaskSectionList from '../../../components/taskSectionList';
import Axios from 'axios';
import { config } from '../../../config/index';

export default function MyTasksPage({
  setUser,
  user,
  initialUser,
  setShow,
  tasks,
  isError,
}) {
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setShow(true);
  });

  const [pastTasks, setPastTasks] = useState(() => {
    if (tasks.length) {
      return tasks.filter((task) => {
        if (task.dueDate && task.dueDate.start) {
          const taskDate = new Date(task.dueDate.start);
          const today = new Date(Date.now());
          return taskDate.getMilliseconds < today.getMilliseconds();
        }
      });
    }
    return [];
  });

  const [nextTasks, setNextTasks] = useState(() => {
    return [];
  });

  const [unassignedTasks, setUnassignedTasks] = useState(() => {
    return [];
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
          <TaskSectionList
            title="Pasadas"
            tasks={pastTasks}
            setTasks={setPastTasks}
            user={user}
          />
          <TaskSectionList
            title="Próximo"
            tasks={nextTasks}
            setTasks={setNextTasks}
            user={user}
          />
          <TaskSectionList
            title="Sin Fecha"
            tasks={unassignedTasks}
            setTasks={setUnassignedTasks}
            user={user}
          />
        </Stack>
      </VStack>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const userCookie = parseCookies(req);
  const user = JSON.parse(userCookie.user);

  try {
    const response = await Axios.get(`${config.url}/api/tasks`, {
      params: {
        assignedTo: user.user.id,
      },
      headers: {
        Authorization: user.jwtToken,
      },
    });
    if (response.data.length) {
      let myTasks = response.data;
      response.data.map(async (task, index) => {
        const project = await Axios.get(
          `${config.url}/api/projects/${task.projects[0].project_id}`,
          {
            headers: {
              Authorization: user.jwtToken,
            },
          }
        );
        myTasks[index].project = project.data;

        if (project.data.creator.isTeam) {
          const team = await Axios.get(
            `${config.url}/api/teams/${project.data.creator.creator_id}`,
            {
              headers: {
                Authorization: user.jwtToken,
              },
            }
          );
          myTasks[index].team = team.data;
        }
      });
    }
    return {
      props: {
        tasks: response.data,
        isError: false,
        initialUser: user,
      },
    };
  } catch (err) {
    console.log(err.response);
    return {
      props: {
        tasks: [],
        isError: true,
        initialUser: user,
      },
    };
  }
}
