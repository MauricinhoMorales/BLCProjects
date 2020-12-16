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

  return {
    props: {
      initialUser: user,
    },
  };
}
