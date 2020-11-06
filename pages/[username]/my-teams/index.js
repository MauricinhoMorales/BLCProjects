import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TeamCard from '../../../components/teamsCard';
import { IconButton, Icon, Loader } from 'rsuite';

import '../../../styles/cards-container.less';

export default function MyTeamsPage(props) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleRoute = (href) => {
    router.push(href);
  };

  const handleNewTeam = () => {
    router.push(
      `/${JSON.parse(localStorage.getItem('user'))._id}/my-teams/newTeam`
    );
  };

  useEffect(async () => {
    try {
      const res = await Axios.get('/api/equipos');
      setLoading(false);
      setTeams(res.data.data);
      return;
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div className="full-container">
      <Head>
        <title>Mis Equipos</title>
      </Head>
      <h3 style={{ paddingBottom: '1.5em' }}>Mis Equipos</h3>
      {loading ? (
        <Loader size="lg" speed="normal" />
      ) : (
        <>
          <div className="cards-container">
            {teams.map((item, index) => {
              return <TeamCard handleRoute={handleRoute} team={item} />;
            })}
          </div>
          <IconButton
            appearance="primary"
            onClick={handleNewTeam}
            circle
            size="lg"
            icon={<Icon icon="plus" />}
            style={{ position: 'fixed', right: '3em', bottom: '2em' }}
          />
        </>
      )}
    </div>
  );
}
