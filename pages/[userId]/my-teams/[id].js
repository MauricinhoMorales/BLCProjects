import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';

import { parseCookies } from '../../../lib/parseCookies';

export default function TeamDetailPage({
  initialUser,
  setUser,
  user,
  setShow,
}) {
  const [team, setTeam] = useState({});
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
    } catch (err) {
      console.log(err.response);
      setFechingError(true);
    }
  }, []);

  if (fetchingError) {
    return <p>Something was wrong....</p>;
  }

  return <h1>{team.name}</h1>;
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
