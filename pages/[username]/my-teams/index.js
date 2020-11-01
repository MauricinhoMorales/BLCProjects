import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TeamCard from '../../../components/teamsCard';

import '../../../styles/cards-container.less';

export default function MyTeamsPage(props) {
  const router = useRouter();

  const handleRoute = (href) => {
    router.push(href);
  };

  return (
    <div className="container-padding full-container">
      <Head>
        <title>Mis Equipos</title>
      </Head>
      <h3 style={{ paddingBottom: '1.5em' }}>Mis Equipos</h3>
      <div className="cards-container">
        <TeamCard handleRoute={handleRoute} />
        <TeamCard handleRoute={handleRoute} />
        <TeamCard handleRoute={handleRoute} />
        <TeamCard handleRoute={handleRoute} />
        <TeamCard handleRoute={handleRoute} />
        <TeamCard handleRoute={handleRoute} />
      </div>
    </div>
  );
}
