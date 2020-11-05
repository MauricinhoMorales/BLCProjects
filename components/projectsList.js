import React from 'react';
import {
  Panel,
  FlexboxGrid,
  Avatar,
  Dropdown,
  Icon,
  IconButton,
  Tag,
  Button,
} from 'rsuite';

export default function ProjectsList(props) {
  return (
    <>
      <FlexboxGrid fluid>
        <FlexboxGrid.Item
          colspan={11}
          style={{
            borderRadius: '10px',
            padding: '1.5em',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '2px 2px 5px grey',
            marginBottom: '4em',
          }}>
          <FlexboxGrid fluid style={{ width: '100%' }} justify="space-between">
            <FlexboxGrid.Item colspan={20}>
              <h5 style={{ marginBottom: '0.5em' }}>GE365</h5>
              Creado por{'\t'}
              <Avatar circle size="md">
                TG
              </Avatar>
              {'\t'}
              Tania Gutierrez
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              colspan={4}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Tag color="green">Desarrollo</Tag>
              <Dropdown
                renderTitle={() => {
                  return <IconButton icon={<Icon icon="more" circle />} />;
                }}>
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 1</Dropdown.Item>
              </Dropdown>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={2}></FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={11}
          style={{
            borderRadius: '10px',
            padding: '1.5em',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '2px 2px 5px grey',
            marginBottom: '4em',
          }}>
          <FlexboxGrid fluid style={{ width: '100%' }}>
            <FlexboxGrid.Item colspan={20}>
              <h5 style={{ marginBottom: '0.5em' }}>GE365</h5>
              Creado por{'   '}
              <Avatar circle size="md">
                TG
              </Avatar>
              {'   '}
              Tania Gutierrez
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              colspan={4}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Tag color="green">Desarrollo</Tag>
              <Dropdown
                renderTitle={() => {
                  return <IconButton icon={<Icon icon="more" circle />} />;
                }}>
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 1</Dropdown.Item>
              </Dropdown>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={11}
          style={{
            borderRadius: '10px',
            padding: '1.5em',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '2px 2px 5px grey',
            marginBottom: '4em',
          }}>
          <FlexboxGrid fluid style={{ width: '100%' }} justify="space-between">
            <FlexboxGrid.Item colspan={20}>
              <h5 style={{ marginBottom: '0.5em' }}>GE365</h5>
              Creado por{'\t'}
              <Avatar circle size="md">
                TG
              </Avatar>
              {'\t'}
              Tania Gutierrez
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              colspan={4}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Tag color="green">Desarrollo</Tag>
              <Dropdown
                renderTitle={() => {
                  return <IconButton icon={<Icon icon="more" circle />} />;
                }}>
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 1</Dropdown.Item>
              </Dropdown>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={2}></FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={11}
          style={{
            borderRadius: '10px',
            padding: '1.5em',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '2px 2px 5px grey',
            marginBottom: '4em',
          }}>
          <FlexboxGrid fluid style={{ width: '100%' }}>
            <FlexboxGrid.Item colspan={20}>
              <h5 style={{ marginBottom: '0.5em' }}>GE365</h5>
              Creado por{'   '}
              <Avatar circle size="md">
                TG
              </Avatar>
              {'   '}
              Tania Gutierrez
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              colspan={4}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Tag color="green">Desarrollo</Tag>
              <Dropdown
                renderTitle={() => {
                  return <IconButton icon={<Icon icon="more" circle />} />;
                }}>
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 1</Dropdown.Item>
              </Dropdown>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={11}
          style={{
            borderRadius: '10px',
            padding: '1.5em',
            border: '1px solid grey',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '4em',
          }}>
          <Button
            appearance="default"
            size={{ backgroundColor: 'white', width: '100%' }}>
            <p style={{ marginBottom: '1em' }}>Crear nuevo proyecto</p>
            <Icon icon="plus" />
          </Button>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
