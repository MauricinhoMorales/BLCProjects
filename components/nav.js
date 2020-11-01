import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Sidenav, Nav, Icon } from 'rsuite';

import '../styles/nav.less';

export default function NavBar(props) {
  const [activeKey, setActiveKey] = useState('1');

  const handleSelect = (eventKey) => {
    setActiveKey(eventKey);
  };
  return (
    <div>
      <Sidenav
        appearance="inverse"
        className="full-container"
        onSelect={handleSelect}
        activeKey={activeKey}>
        <Sidenav.Header style={{ backgroundColor: 'white' }}>
          <img
            style={{ width: 'auto', height: '5em', padding: '15px 15px' }}
            src="/logo.gif"
            alt="BLC Venezuela Logo"
          />
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav className="nav full-container" justified>
            <Nav.Item
              style={{ margin: '1.5em' }}
              eventKey="1"
              icon={<Icon icon="list" style={{ color: 'white' }} />}
              renderItem={(item) => {
                return <Link href="/my-tasks">{item}</Link>;
              }}>
              Mis Tareas
            </Nav.Item>
            <Nav.Item
              eventKey="2"
              icon={<Icon icon="group" style={{ color: 'white' }} />}
              renderItem={(item) => {
                return <Link href="/:username/my-teams">{item}</Link>;
              }}>
              Equipos
            </Nav.Item>
            <Nav.Item
              eventKey="3"
              icon={<Icon icon="folder" style={{ color: 'white' }} />}
              renderItem={(item) => {
                return <Link href="/:username/my-projects">{item}</Link>;
              }}>
              Proyectos
            </Nav.Item>
            <Nav.Item
              eventKey="4"
              icon={<Icon icon="commenting" style={{ color: 'white' }} />}
              renderItem={(item) => {
                return <Link href="/:username/conversations">{item}</Link>;
              }}>
              Conversaciones
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
}
