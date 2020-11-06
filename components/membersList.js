import React from 'react';
import { FlexboxGrid, List, Avatar, Dropdown, IconButton, Icon } from 'rsuite';

export default function MembersList(props) {
  return (
    <>
      <FlexboxGrid
        fluid
        style={{
          padding: '1em 2.5em',
          backgroundColor: '#ededef',
          borderRadius: '20px 20px 0 0',
        }}>
        <FlexboxGrid.Item colspan={8}>
          <p>Miembro</p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6}>
          <p>Cargo</p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6}>
          <p>Permisos</p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}></FlexboxGrid.Item>
      </FlexboxGrid>
          <FlexboxGrid
            fluid
            style={{
              padding: '1em 2.5em',
              display: 'flex',
              alignItems: 'center',
              borderBottom: "1px solid lightgrey"
            }}>
            <FlexboxGrid.Item colspan={8}>
              <FlexboxGrid fluid>
                <FlexboxGrid.Item colspan={4}>
                  <Avatar size="md" circle>
                    TG
                  </Avatar>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={20}>
                  <h6>Tania Gutierrez</h6>
                  <p>riobuenodevelops@gmail.com</p>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <h6>Desarrollador</h6>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <Dropdown
                title="Puede Editar"
                style={{ border: '1px solid', borderRadius: '10px' }}>
                <Dropdown.Item>Editar e Invitar</Dropdown.Item>
                <Dropdown.Item>Solo Editar</Dropdown.Item>
                <Dropdown.Item>Solo Comentar</Dropdown.Item>
              </Dropdown>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              <Dropdown
                renderTitle={() => {
                  return <IconButton circle icon={<Icon icon="more" />} />;
                }}>
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
                <Dropdown.Item>Item 3</Dropdown.Item>
                <Dropdown.Item>Item 4</Dropdown.Item>
              </Dropdown>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid
            fluid
            style={{
              padding: '1em 2.5em',
              display: 'flex',
              alignItems: 'center',
              borderBottom: "1px solid lightgrey"
            }}>
            <FlexboxGrid.Item colspan={8}>
              <FlexboxGrid fluid>
                <FlexboxGrid.Item colspan={4}>
                  <Avatar size="md" circle>
                    TG
                  </Avatar>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={20}>
                  <h6>Tania Gutierrez</h6>
                  <p>riobuenodevelops@gmail.com</p>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <h6>Desarrollador</h6>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={6}>
              <Dropdown
                title="Puede Editar"
                preventOverflow
                style={{ border: '1px solid', borderRadius: '10px' }}>
                <Dropdown.Item>Editar e Invitar</Dropdown.Item>
                <Dropdown.Item>Solo Editar</Dropdown.Item>
                <Dropdown.Item>Solo Comentar</Dropdown.Item>
              </Dropdown>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>
              <Dropdown
                renderTitle={() => {
                  return <IconButton circle icon={<Icon icon="more" />} />;
                }}>
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
                <Dropdown.Item>Item 3</Dropdown.Item>
                <Dropdown.Item>Item 4</Dropdown.Item>
              </Dropdown>
            </FlexboxGrid.Item>
          </FlexboxGrid>
    </>
  );
}
