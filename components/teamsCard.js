import React, { useState } from 'react';
import { Grid, Col, Row, Icon, Dropdown, IconButton } from 'rsuite';

import '../styles/card.less';

export default function TeamCard(props) {
  return (
    <div
      className="polaroid"
      onClick={(e) => {
        e.target.className === 'card-header-container' ||
        e.target.className === 'card-body-container'
          ? props.handleRoute('/:username/my-teams/:team/members')
          : null;
      }}>
      <div className="card-body-container"></div>
      <div className="card-header-container">
        <Grid fluid>
          <Row style={{ alignItems: 'center' }}>
            <Col lg={20}>
              <Row style={{ paddingBottom: '0.5em' }}>
                <h6>Deparment</h6>
              </Row>
              <Row>
                <p className="card-text">6 miembros</p>
              </Row>
            </Col>
            <Col lg={4} style={{ padding: 0 }}>
              <Dropdown
                size="md"
                placement="bottomEnd"
                renderTitle={() => {
                  return (
                    <IconButton
                      appearance="default"
                      icon={<Icon icon="more" rotate={90} size="2x" />}
                      circle
                    />
                  );
                }}
                onClick={(e) => e.preventDefault()}>
                <Dropdown.Item>
                  <Icon icon="phone" /> Iniciar llamada
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon icon="user-plus" /> Invitar a miembro
                </Dropdown.Item>
                <Dropdown.Item divider></Dropdown.Item>
                <Dropdown.Item>
                  <Icon icon="trash" style={{ color: 'red' }} />
                  <p
                    style={{
                      color: 'red',
                      display: 'inline',
                      fontSize: '14px',
                    }}>
                    Eliminar Equipo
                  </p>
                </Dropdown.Item>
              </Dropdown>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}
