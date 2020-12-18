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

  const Lista1 = [
    {
      "nombreTarea": "Tarea 1",
      "nombreProyecto": "Proyecto Astralis",
      "nombreEquipo": "Navidad",
      "nombreResponsable": "Mauricio Morales",
      "estadoTarea": "Terminada",
      "prioridadTarea": "Alta",
      "fechaEntrega": new Date(),
      "descripcionTarea": "Esta es la descripcion de la tarea 1",
      "color": "blue"
    },
    {
      "nombreTarea": "Tarea 2",
      "nombreProyecto": "Proyecto Marcapasos",
      "nombreEquipo": "Octopus",
      "nombreResponsable": "Tania Gutierrez",
      "estadoTarea": "En Proceso",
      "prioridadTarea": "Media",
      "fechaEntrega": new Date(),
      "descripcionTarea": "Esta es la descripcion de la tarea 2",
      "color" : "green"
    }
  ]

  const Lista2 = [
    {
      "nombreTarea": "Tarea 3",
      "nombreProyecto": "Proyecto Makro",
      "nombreEquipo": "Navidad",
      "nombreResponsable": "Roger Franco",
      "estadoTarea": "Terminada",
      "prioridadTarea": "Baja",
      "fechaEntrega": new Date(),
      "descripcionTarea": "Esta es la descripcion de la tarea 3",
      "color": "blue"
    },
    {
      "nombreTarea": "Tarea 4",
      "nombreProyecto": "Proyecto Marcapasos",
      "nombreEquipo": "Octopus",
      "nombreResponsable": "Tania Gutierrez",
      "estadoTarea": "En Proceso",
      "prioridadTarea": "Baja",
      "fechaEntrega": new Date(),
      "descripcionTarea": "Esta es la descripcion de la tarea 4",
      "color" : "yellow"
    }
  ]

  const Lista3 = [
    {
      "nombreTarea": "Tarea 5",
      "nombreProyecto": "Proyecto Astralis",
      "nombreEquipo": "Personal",
      "nombreResponsable": "Ricardo Castellanos",
      "estadoTarea": "Sin Iniciar",
      "prioridadTarea": "Media",
      "fechaEntrega": new Date(),
      "descripcionTarea": "Esta es la descripcion de la tarea 5",
      "color": "red"
    },
    {
      "nombreTarea": "Tarea 6",
      "nombreProyecto": "Proyecto Marcapasos",
      "nombreEquipo": "Octopus",
      "nombreResponsable": "Roger Franco",
      "estadoTarea": "En Proceso",
      "prioridadTarea": "Alta",
      "fechaEntrega": new Date(),
      "descripcionTarea": "Esta es la descripcion de la tarea 6",
      "color" : "orange"
    },
    {
      "nombreTarea": "Tarea 7",
      "nombreProyecto": "Proyecto Navidad Explosiva",
      "nombreEquipo": "Octopus",
      "nombreResponsable": "Tania Gutierrez",
      "estadoTarea": "Terminada",
      "prioridadTarea": "Baja",
      "fechaEntrega": new Date(),
      "descripcionTarea": "Esta es la descripcion de la tarea 7",
      "color" : "teal"
    }
  ]

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
          <TaskSectionList title="HOY" lista={Lista1} memberPermission="edit"/>
          <TaskSectionList title="PROXIMOS" lista={Lista2} memberPermission="edit"/>
          <TaskSectionList title="PROXIMAMENTE" lista={Lista3} memberPermission="edit"/>
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
