import React from 'react';
import { FlexboxGrid, Dropdown, IconButton, Icon } from 'rsuite';

export default function TaskListHeader(props) {
  return (
    <>
      <FlexboxGrid.Item colspan={10} style={{ marginBottom: '0.3em' }}>
        <h3>{props.listTitle}</h3>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item
        className="text-centered"
        colspan={5}
        style={{ marginBottom: '0.3em' }}>
        <h5>Fecha de Entrega</h5>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item
        className="text-centered"
        colspan={4}
        style={{ marginBottom: '0.3em' }}>
        <h5>Estado</h5>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item
        className="text-centered"
        colspan={4}
        style={{ marginBottom: '0.3em' }}>
        <h5>Prioridad</h5>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item
        className="text-centered"
        colspan={1}
        style={{ marginBottom: '0.3em' }}>
        <Dropdown
          renderTitle={() => {
            return <IconButton icon={<Icon icon="plus" />} circle size="sm" />;
          }}></Dropdown>
      </FlexboxGrid.Item>
    </>
  );
}
