import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProjectCard from '../../../components/projectCard';
import { IconButton, Icon, Alertm, Loader } from 'rsuite';

import '../../../styles/cards-container.less';
import Axios from 'axios';

export default function MyProjectsPage(props) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(async () => {
    const allProjectForAUser = [];
    try {
      const resultEquipos = await Axios.get('/api/equipos');
      const resultProyectos = await Axios.get('/api/proyectos');
      const userTeams = resultEquipos.data.data.filter(
        (team) =>
          team.members.includes(JSON.parse(localStorage.getItem('user'))._id) ||
          team.creador === JSON.parse(localStorage.getItem('user'))._id
      );
      for (let i = 0; i < userTeams.length; i++) {
        let projects = resultProyectos.data.data.filter(
          (project) => project.equipo_id === userTeams[i]._id
        );
        allProjectForAUser.push(...projects);
      }
      setProjects(allProjectForAUser);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div className="full-container">
      <Head>
        <title>Mis Proyectos</title>
      </Head>

      <h3 style={{ paddingBottom: '1.5em' }}>Mis Proyectos</h3>
      {loading ? (
        <Loader
          size="lg"
          speed="normal"
          style={{ height: '100', with: '100%' }}
        />
      ) : (
        <>
          <div className="cards-container">
            {projects.map((item, index) => {
              return <ProjectCard project={item} />;
            })}
          </div>
          <IconButton
            appearance="primary"
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
