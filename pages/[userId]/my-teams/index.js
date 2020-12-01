import { useEffect } from 'react';
import Head from 'next/head';
import InConstruction from '../../../components/inConstruction';
import { parseCookies } from '../../../lib/parseCookies';

export default function MyTeamsPage({ setUser, initialUser, setShow }) {
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setShow(true);
  });
  return (
    <>
      <Head>
        <title>Mis Equipos - BLCProjects</title>
      </Head>
      <InConstruction />
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
