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
} from '@chakra-ui/react';
import { ChevronDown } from 'react-feather';

import 'react-calendar/dist/Calendar.css';
import Axios from 'axios';

import TaskDataView from '../components/taskDataView';

export default function TaskSectionTaskItem({
  memberPermission, nombreTarea, nombreProyecto, nombreEquipo, nombreResponsable, estadoTarea, prioridadTarea, fechaEntrega, descripcionTarea
}) {
  const [value, onChange] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const ShowTask = () => {
    setIsVisible(true);
  }

  const hideTask = () => {
    setIsVisible(false);
  }

  return (
    <>
      <Stack direction="row" spacing="0.2em">
        <Stack direction="row" spacing="0.7em" flex={6}>
          <Box w="1.8em" />
          <Box
            flex={6}
            as="button"
            borderLeft={`10px solid green`}
            bg="gray.100"
            padding="0.8em"
            margin="0 2px 2px 0"
            size="md"
            onClick={ShowTask}
            textAlign="left"
          >
            {/* {memberPermission === 'edit' && isEditing ? (
              <Input
                w="80%"
                value={inputValue}
                onChange={onChangeValue}
                onKeyUp={onChangeTaskName}
              />
            ) : ( */}
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
            {/* )} */}
          </Box>
        </Stack>
        <Box flex={2} bg="gray.100" margin="0 2px 2px 0" padding="0.8em" size="md">
          {memberPermission === 'edit' ? (
            <Popover placement="bottom" isLazy>
              <PopoverTrigger>
                <Center
                  _hover={{ cursor: 'pointer' }}
                  borderRadius="100px"
                  style={{ backgroundColor: 'blue.200' }}
                  padding="0.3em"
                  w="100%"
                  h="100%">
                  <Text fontSize="sm" color="white" textAlign="center">
                    {value !== '' ? value.toDateString() : ''}
                  </Text>
                </Center>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBody padding={0}>
                  <Calendar
                    value={value}
                    locale="es-ve"
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
              <Center
                borderRadius="100px"
                style={{ backgroundColor: 'blue.200' }}
                padding="0.3em"
                w="100%"
                h="100%">
                <Text fontSize="sm" color="white" textAlign="center">
                  {fechaEntrega}
                </Text>
              </Center>
            )}
        </Box>
        <Center flex={2} bg="red.500" padding="0.5em" margin="0 2px 2px 0" size="md">
          <Text fontSize="md" color="white" textAlign="center">
            Sin Empezar
          </Text>
        </Center>
        <Center flex={2} bg="yellow.500" padding="0.5em" margin="0 2px 2px 0" size="md">
          <Text fontSize="md" color="white" textAlign="center">
            Alta
          </Text>
        </Center>
      </Stack>
      {isVisible === true?
        <TaskDataView
          hideTask= {hideTask}
          descripcionTarea={descripcionTarea}
          estadoProyecto={estadoTarea}
          fechaEntrega={fechaEntrega}
          nombreProyecto={nombreProyecto}
          nombreResponsable={nombreResponsable}
          nombreTarea={nombreTarea}
        />
        :
        <Box />
      }
    </>
  );
}
