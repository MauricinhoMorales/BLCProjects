import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FlexboxGrid, Nav, Tag, Dropdown, IconButton, Icon } from 'rsuite';

import '../../../../styles/card.less';
import ProjectTaskList from '../../../../components/projectTaskList';
import Axios from 'axios';

export default function ProjectDetailPage(props) {
  const [active, setActive] = useState('tareas');

  const handleSelect = (activeKey) => {
    setActive(activeKey);
  };

  console.log(props, 'props');

  return (
    <>
      <Head>
        <title>{props.data.nombre}</title>
      </Head>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ display: 'inline', marginRight: '1em' }}>
          {props.data.nombre}
        </h3>
        <Tag
          className="tag-padding"
          color="green"
          style={{ display: 'inline', marginRight: '1em' }}>
          Desarrollo
        </Tag>
        <Dropdown
          style={{ display: 'inline' }}
          renderTitle={() => {
            return (
              <IconButton
                circle
                icon={<Icon icon="more" />}
                size="sm"
                appearance="subtle"
              />
            );
          }}></Dropdown>
      </div>
      <div style={{ marginBottom: '2em' }}>
        <p>{props.equipo.departamento}</p>
      </div>
      <Nav
        appearance="subtle"
        activeKey={active}
        onSelect={handleSelect}
        style={{ marginBottom: '1em' }}>
        <Nav.Item eventKey="tareas">Tareas</Nav.Item>
        <Nav.Item eventKey="cronograma">Cronograma</Nav.Item>
        <Nav.Item eventKey="incidencias">Incidencias</Nav.Item>
        <Nav.Item eventKey="documentos">Documentos</Nav.Item>
        <Nav.Item eventKey="presupuesto">Presupuesto</Nav.Item>
      </Nav>
      {active === 'tareas' ? <ProjectTaskList /> : null}
    </>
  );
}

export async function getServerSideProps(context) {
  let result;
  let result2;
  try {
    result = await Axios.get(`/api/proyectos/${context.query.project}`);
    result2 = await Axios.get(`/api/equipos/${result.data.data.equipo_id}`);
    console.log('Pass 1');
    console.log(result.data.data);
    console.log(result2.data.data);
  } catch (e) {
    console.log(e);
  }
  return {
    props: { data: result.data.data, equipo: result2.data.data },
  };
}
