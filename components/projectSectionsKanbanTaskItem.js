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
  Tooltip,
} from '@chakra-ui/react';
import TaskDataView from './taskDataView';

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
  members,
  memberPermission,
  project,
  provided,
  innerRef,
}) {
  const [value, onChange] = useState(() => {
    return task.dueDate && task.dueDate.start
      ? new Date(task.dueDate.start)
      : '';
  });

  const [taskViewVisible, setTaskViewVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setValue] = useState(task.name);
  const [member, setMember] = useState({});

  useEffect(async () => {
    if (task.assignedTo.length) {
      try {
        const response = await Axios.get(`/api/users/${task.assignedTo}`, {
          headers: {
            Authorization: jwtToken,
          },
        });
        setMember(response.data);
      } catch (err) {
        console.log(err.response);
      }
    }
  }, []);

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

  const onTaskVisible = () => {
    setTaskViewVisible(true);
  };

  const onTaskInvisible = () => {
    setTaskViewVisible(false);
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
        marginBottom="0.8em"
        onClick={onTaskVisible}>
        <Flex align="center" onClick={onTaskVisible}>
          <Text fontWeight="bold" color="richBlack.500">
            {task.name}
          </Text>
          <Spacer />
          {member._id ? (
            <Tooltip label={`${member.firtName} ${member.lastName}`}>
              <Avatar
                color="white"
                name={`${member.firtName} ${member.lastName}`}
                size="sm"
              />
            </Tooltip>
          ) : null}
        </Flex>
        <Text fontSize="sm" color="gray.600">
          {value !== '' ? value.toDateString() : ''}
        </Text>
      </Box>
      {taskViewVisible ? (
        <TaskDataView
          onCloseParent={onTaskInvisible}
          task={task}
          tasks={tasks}
          setTasks={setTasks}
          project={project}
          memberPermision={memberPermission}
          member={member}
          members={members}
        />
      ) : null}
    </div>
  );
}
