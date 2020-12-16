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
  HStack,
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

export default function ProjectSectionsTaskItem({
  task,
  color,
  jwtToken,
  tasks,
  setTasks,
  sectionName,
  projectId,
  memberPermission,
  provided,
  innerRef,
}) {
  const [value, onChange] = useState(() => {
    console.log(task.dueDate);
    return task.dueDate && task.dueDate.start
      ? new Date(task.dueDate.start)
      : '';
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setValue] = useState(task.name);

  const onChangeDate = async (date) => {
    onChange(date);
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
    } catch (err) {
      console.log(err.response);
    }
  };

  const changeVisibleOnEnter = () => {
    if (memberPermission === 'edit') {
      setIsVisible(true);
    }
  };

  const changeVisibleOnLeave = () => {
    if (memberPermission === 'edit') {
      setIsVisible(false);
    }
  };

  const handleOnSelect = async (selection) => {
    switch (selection) {
      case 'rename':
        setIsEditing(true);
        break;
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
          let newTasks = tasks.filter((newTask) => newTask._id !== task._id);
          setTasks(newTasks);
        } catch (err) {
          console.log(err.response);
        }
        break;
    }
  };

  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  const onChangeTaskName = async (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      try {
        await Axios.put(
          `/api/tasks/${task._id}`,
          {
            name: inputValue,
          },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );
        let oldTasks = tasks;
        oldTasks.map((oldTask, index) => {
          if (oldTask.name === task.name) {
            oldTasks[index].name = inputValue;
          }
        });
        setTasks(oldTasks);
        setIsEditing(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <li
      key={task._id}
      style={{ listStyle: 'none', listStyleType: 'none' }}
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}>
      <Flex
        w="100%"
        h="100%"
        flex={13}
        onMouseOver={changeVisibleOnEnter}
        onMouseOut={changeVisibleOnLeave}>
        <HStack spacing="0.7em" flex={6}>
          {memberPermission === 'edit' ? (
            <Menu isLazy>
              <MenuButton>
                <IconButton
                  marginLeft="0.6em"
                  visibility={isVisible ? 'visible' : 'hidden'}
                  isRound
                  size={4}
                  variant="ghost"
                  style={{ backgroundColor: color }}
                  icon={
                    <Icon
                      as={ChevronDown}
                      color="white"
                      w={4}
                      h={4}
                      fontWeight="bold"
                    />
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleOnSelect('rename')}>
                  Renombrar Tarea
                </MenuItem>
                <MenuDivider />
                <MenuItem>Archivar</MenuItem>
                <MenuItem onClick={() => handleOnSelect('delete')}>
                  Eliminar
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Box w="1.8em"></Box>
          )}
          <Box
            flex={6}
            borderLeft={`10px solid ${color}`}
            bg="gray.200"
            padding="0.8em"
            margin="0 2px 2px 0">
            {memberPermission === 'edit' && isEditing ? (
              <Input
                w="80%"
                value={inputValue}
                onChange={onChangeValue}
                onKeyUp={onChangeTaskName}
              />
            ) : (
              <Text fontSize="md" color="richBlack.500">
                {task.name}
              </Text>
            )}
          </Box>
        </HStack>
        <Box flex={2} bg="gray.200" margin="0 2px 2px 0" padding="0.5em">
          {memberPermission === 'edit' ? (
            <Popover placement="bottom" isLazy>
              <PopoverTrigger>
                <Center
                  _hover={{ cursor: 'pointer' }}
                  borderRadius="100px"
                  style={{ backgroundColor: value !== '' ? color : 'gray.200' }}
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
                    onChange={onChangeDate}
                    value={value}
                    locale="es-ve"
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <Center
              borderRadius="100px"
              style={{ backgroundColor: value !== '' ? color : 'gray.200' }}
              padding="0.3em"
              w="100%"
              h="100%">
              <Text fontSize="sm" color="white" textAlign="center">
                {value !== '' ? value.toDateString() : ''}
              </Text>
            </Center>
          )}
        </Box>
        {/* <Popover placement="bottom-start">
          <PopoverTrigger> */}
        <Center flex={2} bg="red.500" padding="0.5em" margin="0 2px 2px 0">
          <Text fontSize="md" color="white" textAlign="center">
            Sin Empezar
          </Text>
        </Center>
        {/* </PopoverTrigger>
          <PopoverContent w="175px" bg="red.500" h="20em">
            <PopoverArrow />
            <PopoverBody padding="0" h="15em">
              <Wrap
                direction="column"
                spacing={4}
                padding="0.7em"
                h="15em"
                bg="green.500">
                <WrapItem>
                  <Center padding="0.5em" h="10" w="9em" bg="blue.500">
                    Estado
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center padding="0.5em" h="10" w="9em" bg="blue.500">
                    Estado
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center padding="0.5em" h="10" w="9em" bg="blue.500">
                    Estado
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center padding="0.5em" h="10" w="9em" bg="blue.500">
                    Estado
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center padding="0.5em" h="10" w="9em" bg="blue.500">
                    Estado
                  </Center>
                </WrapItem>
                <WrapItem>
                  <Center padding="0.5em" h="10" w="9em" bg="blue.500">
                    Estado
                  </Center>
                </WrapItem>
              </Wrap>
            </PopoverBody>
          </PopoverContent>
        </Popover> */}
        <Center flex={2} bg="yellow.500" padding="0.5em" margin="0 2px 2px 0">
          <Text fontSize="md" color="white" textAlign="center">
            Alta
          </Text>
        </Center>
        <Box flex={1} bg="gray.200" margin="0 0 2px 0"></Box>
      </Flex>
    </li>
  );
}
