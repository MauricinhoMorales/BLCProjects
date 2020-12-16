import Head from 'next/head';
import { useEffect } from 'react';
import InConstruction from '../../../components/inConstruction';
import { parseCookies } from '../../../lib/parseCookies';

export default function ConversationPage({ initialUser, setShow, setUser }) {
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setShow(true);
  });
  return (
    <>
      <Head>
        <title>Conversaciones - BLCProjects</title>
      </Head>
      <InConstruction />;
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
