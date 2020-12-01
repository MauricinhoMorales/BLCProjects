import { useEffect } from 'react';
import { Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { parseCookies } from '../../../lib/parseCookies';

export default function MyTasksPage({ setUser, initialUser, setShow }) {
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setShow(true);
  });
  return (
    <>
      <Head>
        <title>Mis Tareas - BLCProjects</title>
      </Head>
      <Heading as="h1">My Tasks</Heading>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const userCookie = parseCookies(req);
  const user = JSON.parse(userCookie.user);
  /* try {
    const projects = await Axios.get(`http://localhost:3000/api/projects`, {
      params: {
        creator: user.user.id,
      },
      headers: {
        Authorization: user.jwtToken,
      },
    }); */
  return {
    props: {
      /* projects: projects.data, */
      initialUser: user,
    },
  };
  /* } catch (err) {
    return {
      props: {
        projects: [],
        initialUser: user,
      },
    };
  } */
}
