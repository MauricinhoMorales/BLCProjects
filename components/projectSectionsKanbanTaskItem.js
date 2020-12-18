import { useEffect, useState } from 'react';
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
  VStack,
  Spacer,
  Avatar,
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
  sections,
  setSections,
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

  /* useEffect(() => {
    setTasks
  }) */

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
          let mySections = sections;
          sections.map((mySection, index) => {
            if (mySection.name === sectionName) {
              mySections[index].tasks = sections[index].tasks.filter(
                (sectionTask) => sectionTask._id !== task._id
              );
            }
          });
          setSections(mySections);
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
    <div
      ref={innerRef}
      style={{ width: '100%' }}
      {...provided.draggableProps}
      {...provided.dragHandleProps}>
      <Box
        borderRadius="5px"
        bg="white"
        w="100%"
        h="auto"
        boxShadow="0 0 10px"
        padding="0.5em"
        marginBottom="0.8em">
        <Flex align="center">
          <Text fontWeight="bold" color="richBlack.500">
            {task.name}
          </Text>
          <Spacer />
          <Avatar color="white" name="Tania Gutierrez" size="sm" />
        </Flex>
        <Text fontSize="sm" color="gray.600">
          {value !== '' ? value.toDateString() : ''}
        </Text>
      </Box>
    </div>
  );
}
