import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Col, Row, Icon, IconButton, Dropdown, Tag, Panel } from 'rsuite';

import '../styles/card.less';

export default function ProjectCard(props) {
  const router = useRouter();
  return (
    <>
      <Panel shaded bodyFill>
        <div className="card-body-container">
          <Grid fluid>
            <Row
              style={{
                margin: '1em',
                alignItems: 'center',
                display: 'flex',
                padding: 0,
              }}>
              <Col mdOffset={11} md={9}>
                <Tag color="green" className="bold-text tag-padding">
                  Desarrollo
                </Tag>
              </Col>
              <Col md={4}>
                <Dropdown
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
        <Panel onClick={() => router.push('/:username/my-projects/:project')}>
          <Grid fluid>
            <Row>
              <Col md={24} sm={24} xs={24}>
                <h6>Departamento de Software</h6>
                <p>6 miembros</p>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </Panel>
    </>
  );
  // return (
  //   <div
  //     className="polaroid"
  //     onClick={(e) => {
  //       e.target.className === 'card-header-container' ||
  //       e.target.className === 'card-body-container'
  //         ? props.handleRoute('/:username/my-teams/:team/members')
  //         : null;
  //     }}>
  //     <div className="card-body-container">
  //       <div className="banner">
  //         <Tag color="green" className="bold-text tag-padding">
  //           Desarrollo
  //         </Tag>
  //       </div>
  //     </div>
  //     <div className="card-header-container">
  //       <Grid fluid>
  //         <Row style={{ alignContent: 'center' }}>
  //           <Col lg={20}>
  //             <Row style={{ paddingBottom: '0.5em' }}>
  //               <h6>GE365</h6>
  //             </Row>
  //             <Row>
  //               <p className="card-text">Departamento de Software</p>
  //             </Row>
  //           </Col>
  //           <Col lg={4} style={{ padding: 0 }}>
  //             <Dropdown
  //               size="md"
  //               placement="bottomEnd"
  //               renderTitle={() => {
  //                 return (
  //                   <IconButton
  //                     appearance="default"
  //                     icon={<Icon icon="more" rotate={90} size="2x" />}
  //                     circle
  //                   />
  //                 );
  //               }}
  //               onClick={(e) => e.preventDefault()}>
  //               <Dropdown.Item>
  //                 <Icon icon="phone" /> Iniciar llamada
  //               </Dropdown.Item>
  //               <Dropdown.Item>
  //                 <Icon icon="user-plus" /> Invitar a miembro
  //               </Dropdown.Item>
  //               <Dropdown.Item divider></Dropdown.Item>
  //               <Dropdown.Item>
  //                 <Icon icon="trash" style={{ color: 'red' }} />
  //                 <p
  //                   style={{
  //                     color: 'red',
  //                     display: 'inline',
  //                     fontSize: '14px',
  //                   }}>
  //                   Eliminar Equipo
  //                 </p>
  //               </Dropdown.Item>
  //             </Dropdown>
  //           </Col>
  //         </Row>
  //       </Grid>
  //     </div>
  //   </div>
  // );
}
