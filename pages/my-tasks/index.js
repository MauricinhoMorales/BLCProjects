import React, { useState } from 'react';
import Head from 'next/head';
import { FlexboxGrid, Button, Table, IconButton, Icon } from 'rsuite';
import TasksMock from '../../data/TaskMock.json';

import '../../styles/globals.less';

export default function MyTasks(props) {
  const today = new Date(Date.now);
  const aDayInMillis = 8.64e7;

  const NameCell = ({ rowData, dataKey, ...props }) => (
    <Table.Cell {...props} style={{ padding: 0 }}>
      <div>
        <div>
          {rowData[dataKey]}
          <br />
          Departamento de Informatica
        </div>
      </div>
    </Table.Cell>
  );

  return (
    <>
      <Head>
        <title>Mis Tareas</title>
      </Head>
      <div
        className="vertical-centered-items horizontal-centered-items"
        style={{ marginBottom: '2.5em' }}>
        <IconButton
          appearance="primary"
          size="xs"
          icon={<Icon icon="arrow-left" />}
        />
        <h4 style={{ display: 'inline', margin: '0 1em' }}>
          Sep. 14 - Sep. 20
        </h4>
        <IconButton
          appearance="primary"
          size="xs"
          icon={<Icon icon="arrow-right" />}
        />
      </div>
      <div>
        <Table autoHeight data={TasksMock} rowHeight={40}>
          <Table.Column width={400} resizable>
            <Table.HeaderCell style={{ padding: 0, margin: 0 }}>
              <h3 style={{ padding: 0, margin: 0 }}>Pasada</h3>
            </Table.HeaderCell>
            <NameCell dataKey="nombre" />
          </Table.Column>
          <Table.Column width={200} resizable>
            <Table.HeaderCell>
              <h5>Fecha de Entrega</h5>
            </Table.HeaderCell>
            <Table.Cell dataKey="fecha_entrega" />
          </Table.Column>
          <Table.Column width={200} resizable>
            <Table.HeaderCell>
              <h5>Estado</h5>
            </Table.HeaderCell>
            <Table.Cell dataKey="estado" />
          </Table.Column>
          <Table.Column width={200} resizable>
            <Table.HeaderCell>
              <h5 style={{ padding: 0, margin: 0 }}>Prioridad</h5>
            </Table.HeaderCell>
            <Table.Cell dataKey="prioridad" />
          </Table.Column>
          <Table.Column width={50} align="center">
            <Table.HeaderCell>
              <IconButton size="xs" icon={<Icon icon="plus" />} circle />
            </Table.HeaderCell>
            <Table.Cell dataKey="" />
          </Table.Column>
        </Table>
      </div>
    </>
  );
}
