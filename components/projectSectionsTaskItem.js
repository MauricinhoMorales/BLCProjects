import {
  Flex,
  HStack,
  Icon,
  IconButton,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Text,
  Menu,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  MenuDivider,
  PopoverFooter,
  Button,
  Spacer,
} from '@chakra-ui/react';
import Axios from 'axios';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { ChevronDown } from 'react-feather';

export default function ProjectSectionsTaskItem({
  projectId,
  sectionName,
  task,
  jwtToken,
  tasks,
  setTasks,
  color,
  innerRef,
  provided,
}) {
  const [value, setValue] = useState(() => {
    return task.dueDate && task.dueDate.start
      ? new Date(task.dueDate.start)
      : '';
  });
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCalendarChange = async (date) => {
    try {
      await Axios.put(
        `/api/tasks/${task._id}`,
        {
          dueDate: {
            start: date,
          },
        },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      setValue(date);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  const handleSelection = async (selection) => {
    switch (selection) {
      case 'delete':
        try {
          await Axios.delete(`/api/projects/${projectId}/tasks`, {
            params: {
              sectionName: sectionName,
              taskId: task._id,
            },
            headers: {
              Authorization: jwtToken,
            },
          });
          await Axios.delete(`/api/tasks/${task._id}`, {
            headers: {
              Authorization: jwtToken,
            },
          });
          let newTasks = tasks.filter((taskItem) => taskItem._id !== task._id);
          setTasks(newTasks);
        } catch (err) {
          console.log(err.response);
        }
        break;
    }
  };

  const handleResetDate = () => {
    handleCalendarChange('');
  };

  const handleApplyDate = () => {
    setIsOpen(false);
  };

  return (
    <li
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={innerRef}>
      <Flex
        flex={13}
        w="100%"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <HStack spacing="0.7em" flex={5.5} paddingLeft="0.6em">
          <Menu>
            <MenuButton>
              <IconButton
                style={{
                  backgroundColor: color,
                  visibility: visible ? 'visible' : 'hidden',
                }}
                icon={<Icon as={ChevronDown} color="white" w={4} h={4} />}
                size={4}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Renombrar Tarea</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => handleSelection('delete')}>
                Eliminar Tarea
              </MenuItem>
            </MenuList>
          </Menu>
          <Box
            padding="0.5em"
            bg="gray.200"
            w="100%"
            style={{
              borderLeftColor: color,
              borderLeft: `10px solid ${color}`,
              marginBottom: '2px',
              marginRight: '2px',
            }}>
            <Text color="richBlack.500">{task.name}</Text>
          </Box>
        </HStack>
        <Center
          flex={2}
          bg="gray.200"
          padding="0.3em"
          style={{
            marginBottom: '2px',
            marginRight: '2px',
          }}>
          <Popover isLazy isOpen={isOpen}>
            <PopoverTrigger>
              <Center
                w="100%"
                h="100%"
                onClick={() => setIsOpen(true)}
                _hover={{ cursor: 'pointer' }}
                padding="0.1em"
                style={{
                  borderRadius: '100px',
                  backgroundColor: value !== '' ? color : 'gray.200',
                }}>
                <Text color="white">
                  {value !== '' ? value.toLocaleDateString() : ''}
                </Text>
              </Center>
            </PopoverTrigger>
            <PopoverContent padding="0">
              <PopoverBody>
                <Calendar
                  value={value}
                  onChange={handleCalendarChange}
                  locale="es-ve"
                />
              </PopoverBody>
              <PopoverFooter>
                <Flex>
                  <Button
                    variant="link"
                    color="richBlack.500"
                    onClick={handleResetDate}>
                    Resetear Fecha
                  </Button>
                  <Spacer />
                  <Button
                    onClick={handleApplyDate}
                    style={{
                      backgroundColor: color,
                      color: 'white',
                      borderRadius: '100px',
                    }}>
                    Aplicar
                  </Button>
                </Flex>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Center>
        <Center
          flex={2}
          bg="red.500"
          style={{
            marginBottom: '2px',
            marginRight: '2px',
          }}>
          <Text color="white">Sin Empezar</Text>
        </Center>
        <Center
          flex={2}
          bg="red.500"
          style={{
            marginBottom: '2px',
            marginRight: '2px',
          }}>
          <Text color="white">Sin Empezar</Text>
        </Center>
        <Box flex={1} bg="gray.200" w="100%" marginBottom="2px"></Box>
      </Flex>
    </li>
  );
}
