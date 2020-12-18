import { useState } from 'react';
import Calendar from 'react-calendar';
import {
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Box,
  Text,
  Center,
  IconButton,
  Icon,
  Stack,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Menu,
  Input,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  Portal,
  Button,
  PopoverFooter
} from '@chakra-ui/react';
import { ChevronDown } from 'react-feather';

import 'react-calendar/dist/Calendar.css';
import Axios from 'axios';

import TaskDataView from '../components/taskDataView';

export default function TaskSectionTaskItem({
  memberPermission, nombreTarea, nombreProyecto, nombreEquipo, nombreResponsable, estadoTarea, prioridadTarea, fechaEntrega, descripcionTarea, color
}) {
  const prioridades = [
  {"prioridad":"Alta",
    "color":"red"},
  {"prioridad":"Media",
    "color":"yellow"},
  {"prioridad":"Baja",
    "color":"green"}
  ];

  const estados = [
    {"estado":"Sin Iniciar",
      "color":"red"},
    {"estado":"En Proceso",
      "color":"yellow"},
    {"estado":"Terminada",
      "color":"green"}
    ];

    
  const obtenerColorPrioridad = (e) => {
    switch(e){
      case "Alta": return "red"; 
      case "Media": return "yellow";
      case "Baja": return "green";
      default: return "blue";
    }
  }

  const obtenerColorEstado = (e) => {
    switch(e){
      case "Sin Iniciar": return "red"; 
      case "En Proceso": return "yellow";
      case "Terminada": return "green";
      default: return"blue";
    }
  }

  const [colorPrioridad,setColorPrioridad]= useState(() => obtenerColorPrioridad(prioridadTarea));
  const [colorEstado,setColorEstado]= useState(() => obtenerColorEstado(estadoTarea));
  const [valueEstado, setValueEstado]=useState(estadoTarea);
  const [valuePrioridad, setValuePrioridad]=useState(prioridadTarea);
  const [valueDescripcion,setValueDescripicon] =useState(descripcionTarea);

  const [valueDate, onChange] = useState(fechaEntrega);
  const [isVisible, setIsVisible] = useState(false);

  const ShowTask = () => {
    setIsVisible(true);
  }

  const hideTask = () => {
    setValueDescripicon(descripcionTarea);
    setIsVisible(false);
  }

  const onChangeDate = async (date) => {
    onChange(date);
  };

  const onChangeEstado = (e) =>{
    setColorEstado(estados[e].color);
    setValueEstado(estados[e].estado);
  }

  const onChangePrioridad = (e) =>{
    setColorPrioridad(prioridades[e].color);
    setValuePrioridad(prioridades[e].prioridad);
  }

  const onChangeDescripcion = (e) =>{
    setValueDescripicon(e);
  }

  return (
    <>
      <Stack direction="row" spacing="0.2em">
        <Stack direction="row" spacing="0.7em" flex={6}>
          <Box w="1.8em" />
          <Box
            flex={6}
            as="button"
            borderLeft={`10px solid ${color}`}
            bg="gray.100"
            padding="0.8em"
            margin="0 2px 2px 0"
            size="md"
            onClick={ShowTask}
            textAlign="left"
          >
            <Stack direction="column" spacing="0.0em">
              <Text fontSize="md" color="richBlack.500">
                {nombreTarea}
              </Text>
              <Stack direction="row">
                <Text fontSize="sm" color="gray.500">
                  {nombreEquipo + " > " + nombreProyecto}
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <Box flex={2} bg="gray.100" margin="0 2px 2px 0" padding="0.8em" size="md">
          {memberPermission === 'edit' ? (
            <Popover placement="bottom" isLazy>
              <PopoverTrigger>
                <Center
                  _hover={{ cursor: 'pointer' }}
                  borderRadius="100px"
                  style={{ backgroundColor: valueDate !== '' ? color : 'gray.200' }}
                  padding="0.3em"
                  w="100%"
                  h="100%">
                  <Text fontSize="sm" color="white" textAlign="center">
                    {valueDate !== '' ? valueDate.toDateString() : ''}
                  </Text>
                </Center>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody padding={0}>
                  <Calendar
                    onChange={onChangeDate}
                    value={valueDate}
                    locale="es-ve"
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
              <Center
                borderRadius="100px"
                style={{ backgroundColor: valueDate !== '' ? color : 'gray.200' }}
                padding="0.3em"
                w="100%"
                h="100%">
                <Text fontSize="sm" color="white" textAlign="center">
                  {valueDate !== '' ? valueDate.toDateString() : ''}
                </Text>
              </Center>
            )}
        </Box>


        <Popover>
          <PopoverTrigger>
            <Center flex={2} bg={colorEstado+".500"} padding="0.5em" margin="0 2px 2px 0" size="md">
              <Text fontSize="md" color="white" textAlign="center">
                {valueEstado}
              </Text>
            </Center>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                <Center>
                  Seleccionar el estado de la tarea
                </Center>
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Stack direction="row">
                  <Button colorScheme={estados[0].color} onClick={() => onChangeEstado(0)}><Text fontSize="md" fontWeight="normal">{estados[0].estado}</Text></Button>
                  <Button colorScheme={estados[1].color} onClick={() => onChangeEstado(1)}><Text fontSize="md" fontWeight="normal">{estados[1].estado}</Text></Button>
                  <Button colorScheme={estados[2].color} onClick={() => onChangeEstado(2)}><Text fontSize="md" fontWeight="normal">{estados[2].estado}</Text></Button>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Center flex={2} bg={colorPrioridad+".500"} padding="0.5em" margin="0 2px 2px 0" size="md">
              <Text fontSize="md" color="white" textAlign="center">
                {valuePrioridad}
              </Text>
            </Center>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                <Center>
                  Seleccionar la prioridad de la tarea
                </Center>
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Center>
                <Stack direction="row">
                  <Button colorScheme={prioridades[0].color} onClick={() => onChangePrioridad(0)}><Text fontSize="md" fontWeight="normal">{prioridades[0].prioridad}</Text></Button>
                  <Button colorScheme={prioridades[1].color} onClick={() => onChangePrioridad(1)}><Text fontSize="md" fontWeight="normal">{prioridades[1].prioridad}</Text></Button>
                  <Button colorScheme={prioridades[2].color} onClick={() => onChangePrioridad(2)}><Text fontSize="md" fontWeight="normal">{prioridades[2].prioridad}</Text></Button>
                </Stack>
                </Center>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Stack>

      {isVisible === true ?
        <TaskDataView
          hideTask={hideTask}
          descripcionTarea={valueDescripcion}
          estadoProyecto={valueEstado}
          fechaEntrega={valueDate}
          nombreProyecto={nombreProyecto}
          nombreResponsable={nombreResponsable}
          nombreTarea={nombreTarea}
          prioridad={valuePrioridad}
          colorPrioridad={colorPrioridad}
          colorEstado={colorEstado}
          color={color}
        />
        :
        <Box />
      }
    </>
  );
}
