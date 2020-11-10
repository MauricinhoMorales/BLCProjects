import React, { useState } from 'react';
import Head from 'next/head';
import { Nav } from 'rsuite';

import '../../../../styles/membersPage.less';

export default function MembersListPage(props) {
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
      <Nav activeKey={active} onSelect={handleSelect} appearance="subtle">
        <Nav.Item eventKey="members">Miembros</Nav.Item>
        <Nav.Item eventKey="projects">Proyectos</Nav.Item>
      </Nav>
    </>
  );
}
