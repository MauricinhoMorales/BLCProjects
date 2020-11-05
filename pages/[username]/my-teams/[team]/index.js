import React, { useState } from 'react';
import Head from 'next/head';
import { Nav } from 'rsuite';
import ProjectsList from '../../../../components/projectsList';
import MembersList from '../../../../components/membersList';

import '../../../../styles/membersPage.less';

export default function TeamPage(props) {
  const [active, setActive] = useState('members');

  const handleSelect = (activeKey) => {
    setActive(activeKey);
  };

  return (
    <>
      <Head>
        <title>Departamento de Software</title>
      </Head>
      <div className="header">
        <h3>Departamento de Software</h3>
        <p>6 miembros</p>
      </div>
      <Nav
        activeKey={active}
        onSelect={handleSelect}
        appearance="subtle"
        className="header">
        <Nav.Item eventKey="members">Miembros</Nav.Item>
        <Nav.Item eventKey="projects">Proyectos</Nav.Item>
      </Nav>
      {active === 'members' ? <MembersList /> : <ProjectsList />}
    </>
  );
}
