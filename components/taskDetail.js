import React from 'react';
import { Modal, FlexboxGrid, Button, IconButton, Icon, Avatar } from 'rsuite';

export default function TaskDetail(props){
  return (
    <>
      <Modal show={props.show} backdrop="static" full onHide={props.handleClose}>
        <Modal.Header>
          <FlexboxGrid fluid>
            <FlexboxGrid.Item colspan={19}>
              <Button appearance="ghost">Marcar como Finalizada</Button>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={1}>
              <IconButton appearance="subtle" circle size="md" icon={<Icon icon="paperclip"/>} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={1}>
              <IconButton appearance="subtle" circle size="md" icon={<Icon icon="thumbs-up"/>} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={1}>
              <IconButton appearance="subtle" circle size="md" icon={<Icon icon="link"/>} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={1}>
              <IconButton appearance="subtle" circle size="md" icon={<Icon icon="flow"/>} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={1}>
              <IconButton appearance="subtle" circle size="md" icon={<Icon icon="more"/>} />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Modal.Header>
        <Modal.Body>
          <FlexboxGrid fluid align="middle" style={{padding: "1.5em"}}>
            <FlexboxGrid.Item colspan={24} style={{marginBottom: "1.5em"}}>
              <h5>Disenio de Base de Datos</h5>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4} style={{marginBottom: "1.5em"}}>
              <p>Responsable</p>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={20} style={{marginBottom: "1.5em"}}>
              <Avatar circle size="md">TG</Avatar> Tania Gutierrez
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4} style={{marginBottom: "1.5em"}}>
              <p>Responsable</p>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={20} style={{marginBottom: "1.5em"}}>
              <Avatar circle size="md">TG</Avatar> Tania Gutierrez
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4} style={{marginBottom: "1.5em"}}>
              <p>Responsable</p>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={20} style={{marginBottom: "1.5em"}}>
              <Avatar circle size="md">TG</Avatar> Tania Gutierrez
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4} style={{marginBottom: "1.5em"}}>
              <p>Responsable</p>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={20} style={{marginBottom: "1.5em"}}>
              <Avatar circle size="md">TG</Avatar> Tania Gutierrez
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Modal.Body>
      </Modal>
    </>
  )
}