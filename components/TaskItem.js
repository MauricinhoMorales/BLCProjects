import React, { useState } from 'react';
import { FlexboxGrid, DatePicker, Dropdown } from 'rsuite';

import '../styles/my-tasks.less';

export default function TaskItem(props) {
  const [status, setStatus] = useState('En Progreso');
  const [prioridad, setPrioridad] = useState('Alta');

  const handleStatus = (eventKey) => {
    setStatus(eventKey);
  };

  const handlePrioridad = (eventKey) => {
    setPrioridad(eventKey);
  };

  return (
    <>
      <FlexboxGrid.Item
        colspan={10}
        className="gray-background"
        style={{
          display: 'inline',
          padding: '0.7em 0 0.7em 0.7em',
          borderLeft: '10px solid red',
        }}>
        <div onClick={props.handleOpen}>
          <p className="black-text bold-text" style={{ paddingBottom: 0 }}>
            Inicio de Proyecto
          </p>
          <p className="gray-text small-text" style={{ paddingTop: 0 }}>
            Departamento de Software {' > '} GE365
          </p>
        </div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item
        colspan={5}
        className="gray-background"
        style={{
          padding: '0.5em',
        }}>
        <DatePicker block cleanable={false} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item
        className="gray-background"
        colspan={4}
        style={{ padding: 0 }}>
        <Dropdown
          title={status}
          placement="bottomEnd"
          noCaret
          block
          className="my-dropdown"
          style={{ margin: 0 }}
          onSelect={handleStatus}>
          <Dropdown.Item eventKey="En Progreso">En Progreso</Dropdown.Item>
          <Dropdown.Item eventKey="Retrasado">Retrasado</Dropdown.Item>
          <Dropdown.Item eventKey="Completado">Completado</Dropdown.Item>
        </Dropdown>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item className="gray-background" colspan={4}>
        <Dropdown
          title={prioridad}
          placement="bottomEnd"
          block
          noCaret
          className="my-dropdown"
          onSelect={handlePrioridad}>
          <Dropdown.Item eventKey="Alta">Alta</Dropdown.Item>
          <Dropdown.Item eventKey="Media">Media</Dropdown.Item>
          <Dropdown.Item eventKey="Baja">Baja</Dropdown.Item>
        </Dropdown>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item className="gray-background" colspan={1}>
        <div
          style={{
            backgroundColor: 'lightgray',
            width: '100%',
            height: '100%',
          }}></div>
      </FlexboxGrid.Item>
    </>
  );
}
