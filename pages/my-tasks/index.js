import React, { useState } from 'react';
import Head from 'next/head';
import { FlexboxGrid, IconButton, Icon, Dropdown, Input } from 'rsuite';
import TaskItem from '../../components/TaskItem';
import NewTask from '../../components/newTask';
import TaskListHeader from '../../components/TaskListHeader';
import TaskDetail from '../../components/taskDetail';

import '../../styles/my-tasks.less';

export default function MyTasks(props) {
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const today = new Date(Date.now);
  const aDayInMillis = 8.64e7;

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
      <div style={{ marginTop: '5em' }}>
        <FlexboxGrid fluid align="middle">
          <TaskListHeader listTitle="Pasada" />
          <TaskItem handleOpen={handleOpen} />
          <NewTask />
        </FlexboxGrid>
      </div>
      <div style={{ marginTop: '5em' }}>
        <FlexboxGrid fluid align="middle">
          <TaskListHeader listTitle="Hoy" />
          <TaskItem />
          <NewTask />
        </FlexboxGrid>
      </div>
      <div style={{ marginTop: '5em' }}>
        <FlexboxGrid fluid align="middle">
          <TaskListHeader listTitle="Mañana" />
          <TaskItem />
          <NewTask />
        </FlexboxGrid>
      </div>
      <div style={{ marginTop: '5em' }}>
        <FlexboxGrid fluid align="middle">
          <TaskListHeader listTitle="Próximo" />
          <TaskItem />
          <NewTask />
        </FlexboxGrid>
      </div>
      <TaskDetail show={show} handleClose={handleClose} />
    </>
  );
}
