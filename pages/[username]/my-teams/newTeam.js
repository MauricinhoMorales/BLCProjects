import React, { useState } from 'react';
import {
  FlexboxGrid,
  InputGroup,
  Button,
  Input,
  Popover,
  IconButton,
  Icon,
  Whisper,
  Dropdown,
  Alert,
} from 'rsuite';
import { CirclePicker } from 'react-color';
import { useRouter } from 'next/router';
import Axios from 'axios';

import '../../../styles/newTeam.less';

export default function NewTeamPage(props) {
  const [backgroundColor, setBackgroundColor] = useState('red');
  const [newTeam, setNewTeam] = useState({
    nombre: '',
    color: '',
    creador: '',
    departamento: '',
    members: [],
    proyectos: [],
  });
  const [active, setActive] = useState('Seleccione');
  const router = useRouter();

  const onCancel = () => {
    router.push({
      pathname: `/:username/my-teams`,
      query: {
        username: "5fa4bd2afc13ae39a5000014",
      },
    });
  };

  const onClick = async (e) => {
    setNewTeam({
      ...newTeam,
      creador: "5fa4bd2afc13ae39a5000014"
    });
    try {
      const result = await Axios.post('/api/equipos', newTeam);

      if (result.data.success) {
        router.push(
          `/${JSON.parse(localStorage.getItem('user'))._id}/my-teams`
        );
      }
    } catch (e) {
      console.log(e);
      Alert.error('Ha ocurrido un error', 8000);
    }
  };

  const onChangeInput = (e) => {
    console.log(e);
    setNewTeam({ ...newTeam, nombre: e });
  };

  const handleColor = (color) => {
    setBackgroundColor(color.hex);
    setNewTeam({ ...newTeam, color: color.hex });
  };

  const handleActive = (activeKey) => {
    setActive(activeKey);
    setNewTeam({ ...newTeam, departamento: activeKey });
  };

  const Speaker = ({ ...props }) => {
    return (
      <Popover {...props}>
        <CirclePicker onChangeComplete={handleColor} />
      </Popover>
    );
  };

  return (
    <>
      <div
        style={{
          margin: '3em 8em 3em 8em',
          boxShadow: '2px 2px 5px lightgrey',
          borderRadius: '10px',
        }}>
        <FlexboxGrid fluid align="middle" style={{ padding: '2.5em' }}>
          <FlexboxGrid.Item
            className="horizontal-gutter"
            colspan={24}
            style={{ textAlign: 'center' }}>
            <h2>Nuevo Equipo</h2>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className="horizontal-gutter" colspan={5}>
            <p>Nombre del Equipo</p>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className="horizontal-gutter" colspan={19}>
            <Input
              size="md"
              style={{ height: '100%' }}
              onChange={onChangeInput}
              value={newTeam.nombre}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className="horizontal-gutter" colspan={5}>
            <p>Color del Equipo</p>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className="horizontal-gutter" colspan={1}>
            <Icon icon="square" size="2x" style={{ color: backgroundColor }} />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className="horizontal-gutter" colspan={18}>
            <Whisper
              trigger="click"
              speaker={<Speaker />}
              placement="bottomStart">
              <IconButton
                appearance="subtle"
                circle
                size="lg"
                icon={<Icon icon="magic2" />}
              />
            </Whisper>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={5}>
            <p>Departamento</p>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8}>
            <Dropdown
              activeKey={active}
              onSelect={handleActive}
              placement="bottomStart"
              title={active}>
              <Dropdown.Item eventKey="Software">Software</Dropdown.Item>
              <Dropdown.Item eventKey="Marketing">Marketing</Dropdown.Item>
              <Dropdown.Item eventKey="RRSS">RRSS</Dropdown.Item>
              <Dropdown.Item eventKey="Operaciones">Operaciones</Dropdown.Item>
            </Dropdown>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
      <FlexboxGrid fluid style={{ margin: '0 2em' }} justify="space-between">
        <FlexboxGrid.Item colspan={12}>
          <Button
            className="button-padding"
            appearance="default"
            onClick={onCancel}>
            Cancelar
          </Button>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={12}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <Button
            className="button-padding"
            appearance="primary"
            onClick={onClick}>
            Finalizar
          </Button>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
