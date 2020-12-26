import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { parseCookies } from '../lib/parseCookies';

export default function HomePage({ user, setUser, initialUser }) {
  const Router = useRouter();
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
      Router.replace(`${user.user.id}/my-tasks`);
    } else {
      Router.replace('/login');
    }
  }, [user]);

  return null;
}
export async function getServerSideProps({ req }) {
  const userCookie = parseCookies(req);
  let user;
  if (!userCookie.user) {
    user = null;
  } else {
    user = JSON.parse(userCookie.user);
  }
  return {
    props: {
      initialUser: user,
    },
  };
}
