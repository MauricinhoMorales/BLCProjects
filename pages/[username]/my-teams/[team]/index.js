import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Nav } from 'rsuite';
import ProjectsList from '../../../../components/projectsList';
import MembersList from '../../../../components/membersList';

import '../../../../styles/membersPage.less';
import { useRouter } from 'next/router';
import Axios from 'axios';

export default function TeamPage(props) {
  const [active, setActive] = useState('members');
  const [team, setTeam] = useState({});
  const router = useRouter();

  const handleSelect = (activeKey) => {
    setActive(activeKey);
  };

  useEffect(async () => {
    try {
      const res = await Axios.get(`/api/equipos/${router.query.team}`);
      setTeam(res.data.data);
    } catch (e) {}
  });

  return (
    <>
      <Head>
        <title>{team.nombre}</title>
      </Head>
      <div className="header">
        <h3>{team.nombre}</h3>
        <p>{team.numberOfMembers} miembros</p>
      </div>
      <Nav
        activeKey={active}
        onSelect={handleSelect}
        appearance="subtle"
        style={{ marginBottom: '1.5em' }}>
        <Nav.Item eventKey="members">Miembros</Nav.Item>
        <Nav.Item eventKey="projects">Proyectos</Nav.Item>
      </Nav>
      {active === 'members' ? <MembersList /> : <ProjectsList />}
    </>
  );
}
