import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProjectCard from '../../../components/projectCard';

import '../../../styles/cards-container.less';

export default function MyProjectsPage(props) {
  const router = useRouter();

  const handleRoute = (href) => {
    router.push(href);
  };

  return (
    <div className="container-padding full-container">
      <Head>
        <title>Mis Proyectos</title>
      </Head>
      <h3 style={{ paddingBottom: '1.5em' }}>Mis Equipos</h3>
      <div className="cards-container">
        <ProjectCard handleRoute={handleRoute} />
        <ProjectCard handleRoute={handleRoute} />
        <ProjectCard handleRoute={handleRoute} />
        <ProjectCard handleRoute={handleRoute} />
        <ProjectCard handleRoute={handleRoute} />
        <ProjectCard handleRoute={handleRoute} />
      </div>
    </div>
  );
}
