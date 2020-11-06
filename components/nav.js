import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Sidenav, Nav, Icon } from 'rsuite';

import '../styles/nav.less';

export default function NavBar(props) {
  const [activeKey, setActiveKey] = useState('myTasks');

  const handleSelect = (activeKey) => {
    setActiveKey(activeKey);
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
              className="nav-item"
              eventKey="myTasks"
              icon={<Icon icon="list" style={{ color: 'white' }} />}
              renderItem={(item) => {
                return <Link href="/my-tasks">{item}</Link>;
              }}>
              Mis Tareas
            </Nav.Item>
            <Nav.Item
              eventKey="myTeams"
              className="nav-item"
              active
              icon={<Icon icon="group" style={{ color: 'white' }} />}
              renderItem={(item) => {
                return <Link href="/:username/my-teams">{item}</Link>;
              }}>
              Equipos
            </Nav.Item>
            <Nav.Item
              eventKey="myProjects"
              className="nav-item"
              icon={<Icon icon="folder" style={{ color: 'white' }} />}
              renderItem={(item) => {
                return <Link href="/:username/my-projects">{item}</Link>;
              }}>
              Proyectos
            </Nav.Item>
            <Nav.Item
              eventKey="conversations"
              className="nav-item"
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
