import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Col, Row, Icon, Dropdown, IconButton, Panel } from 'rsuite';

import '../styles/card.less';

export default function TeamCard(props) {
  const router = useRouter();

  const onClick = () => {
    router.push(
      `/${JSON.parse(localStorage.getItem('user'))._id}/my-teams/${
        props.team._id
      }`
    );
  };

  return (
    <>
      <Panel shaded bodyFill style={{ position: 'relative' }}>
        <div
          className="card-body-container"
          style={{ backgroundColor: props.team.color }}>
          <Grid fluid>
            <Row>
              <Col
                mdOffset={20}
                md={4}
                style={{ marginRight: '1em', marginTop: '1em' }}>
                <Dropdown
                  appearance="subtle"
                  placement="bottomEnd"
                  renderTitle={() => {
                    return (
                      <IconButton
                        appearance="default"
                        icon={<Icon icon="more" rotate={90} size="lg" />}
                        circle
                      />
                    );
                  }}>
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
        <Panel className="card-header" onClick={onClick}>
          <Grid fluid>
            <Row>
              <Col md={24} sm={24} xs={24}>
                <h6>{props.team.nombre}</h6>
                <p>{props.team.numberOfMembers} miembros</p>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </Panel>
    </>
  );
}
