import { useState } from 'react';
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
  Spacer,
} from '@chakra-ui/react';

import TaskSectionTaskItem from '../components/taskSectionTaskItem';

export default function TaskSectionList({ title, tasks, setTasks, user }) {
  return (
    <Stack direction="column" spacing="0.2em" flex={6}>
      <Stack direction="row" padding="0">
        <Text
          fontSize="2xl"
          color="richBlack.500"
          fontWeight="bold"
          flex={2}
          textAlign="left"
          marginLeft="60px">
          {title}
        </Text>
        <Box w="30px" />
        <Spacer />
        <Spacer />
        <Text
          fontSize="md"
          color="richBlack.500"
          fontWeight="bold"
          flex={2}
          textAlign="center">
          Fecha de Entrega
        </Text>
        <Text
          fontSize="md"
          color="richBlack.500"
          fontWeight="bold"
          flex={2}
          textAlign="center">
          Estado
        </Text>
        <Text
          fontSize="md"
          color="richBlack.500"
          fontWeight="bold"
          flex={2}
          textAlign="center">
          Prioridad
        </Text>
      </Stack>
      {tasks.map((task) => {
        return (
          <TaskSectionTaskItem
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            user={user}
          />
        );
      })}
    </Stack>
  );
}
