import React, { useState } from 'react';
import Head from 'next/head';
import { FlexboxGrid, Button, List } from 'rsuite';

export default function MyTasks(props) {
  return (
    <>
      <Head>
        <title>Mis Tareas</title>
      </Head>
      <FlexboxGrid fluid>
        <FlexboxGrid.Item
          colspan={9}
          style={{
            paddingTop: '1.5em',
            paddingBottom: '1.5em',
            textAlign: 'right',
          }}>
          <Button appearance="primary">Arrow Left</Button>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={6}
          style={{
            paddingTop: '1.5em',
            paddingBottom: '1.5em',
            textAlign: 'center',
          }}>
          <h4>Sep. 14 - Sep. 20</h4>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={9}
          style={{
            paddingTop: '1.5em',
            paddingBottom: '1.5em',
            textAlign: 'left',
          }}>
          <Button appearance="primary">Arrow Right</Button>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}>
          <h3>Tasks List</h3>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
