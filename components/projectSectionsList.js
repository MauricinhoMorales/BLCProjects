import { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Center,
  Heading,
  IconButton,
  Icon,
  Input,
  HStack,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Collapse,
} from '@chakra-ui/react';
import { ChevronDown, Plus } from 'react-feather';
import ProjectSectionsTaskItem from './projectSectionsTaskItem';
import Axios from 'axios';
import { Draggable } from 'react-beautiful-dnd';

export default function ProjectSectionsList({
  section,
  projectId,
  color,
  user,
  sections,
  setSections,
  memberPermission,
  provided,
  innerRef,
}) {
  const [tasks, setTasks] = useState(() => {
    return section.tasks || [];
  });
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(section.name);

  useEffect(() => {
    setTasks(section.tasks);
  }, [sections]);

  const handleNewTask = async (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      try {
        const newTask = await Axios.post(
          `/api/tasks`,
          {
            name: e.target.value,
            description: '',
            assignedTo: '',
            currentPriority: {},
            currentStatus: {},
            dueDate: {},
            progress: 0,
            projects: [{ project_id: projectId, section_name: section.name }],
          },
          {
            headers: {
              Authorization: user.jwtToken,
            },
          }
        );
        await Axios.post(
          `/api/projects/${projectId}/tasks`,
          {
            sectionName: section.name,
            taskId: newTask.data,
          },
          {
            headers: {
              Authorization: user.jwtToken,
            },
          }
        );
        const task = await Axios.get(`/api/tasks/${newTask.data}`, {
          headers: {
            Authorization: user.jwtToken,
          },
        });
        setTasks([...tasks, task.data]);
        console.log('Tasks', tasks);
      } catch (err) {
        console.log(err.response);
      }
      e.target.value = '';
    }
  };

  const handleOnSelect = async (nameSection) => {
    switch (nameSection) {
      case 'collapse':
        setIsOpen(!isOpen);
        break;
      case 'rename':
        setIsEditing(true);
        break;
      case 'delete':
        try {
          await Axios.delete(`/api/projects/${projectId}/sections`, {
            params: {
              name: section.name,
            },
            headers: {
              Authorization: user.jwtToken,
            },
          });
          let newSections = sections.filter(
            (newSection) => newSection.name !== section.name
          );
          console.log(newSections);
          setSections(newSections);
        } catch (err) {
          console.log(err.response);
        }
        break;
    }
  };

  const handleChangeNameSection = async (e) => {
    console.log(e);
    if (e.key === 'Enter' || e.keyCode === 13) {
      try {
        await Axios.put(
          `/api/projects/${projectId}/sections`,
          {
            oldSectionName: section.name,
            newSectionName: value,
          },
          {
            headers: {
              Authorization: user.jwtToken,
            },
          }
        );
        let oldSections = sections;
        oldSections.map((oldSection, index) => {
          if (oldSection.name === section.name) {
            oldSections[index].name = value;
          }
        });
        setSections(oldSections);
      } catch (err) {
        console.log(err.response);
      }
      setIsEditing(false);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <ul ref={innerRef} {...provided.droppableProps}>
      <Flex h="100%" flex={13} align="center" padding="0.5em 0">
        <HStack spacing="0.3em" flex={5.5}>
          <Menu>
            <MenuButton>
              <IconButton
                isRound
                size="sm"
                variant="ghost"
                icon={
                  <Icon as={ChevronDown} color="richBlack.500" w={4} h={4} />
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleOnSelect('collapse')}>
                {isOpen ? 'Colapsar Seccion' : 'Mostrar Seccion'}
              </MenuItem>
              {memberPermission === 'edit' ? (
                <>
                  <MenuDivider />
                  <MenuItem onClick={() => handleOnSelect('rename')}>
                    Renombrar seccion
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => handleOnSelect('delete')}>
                    Eliminar Seccion
                  </MenuItem>
                </>
              ) : null}
            </MenuList>
          </Menu>
          {memberPermission === 'edit' && isEditing ? (
            <Input
              w="100%"
              fontSize="xl"
              fontWeight="bold"
              color="richBlack.500"
              value={value}
              onChange={onChange}
              onKeyUp={handleChangeNameSection}
            />
          ) : (
            <Heading
              padding="0.5em 0.5em 0.5em 0"
              as="h3"
              color="richBlack.500"
              fontSize="xl"
              fontWeight="bold">
              {section.name}
            </Heading>
          )}
        </HStack>
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
        <Center flex={1}>
          <IconButton
            icon={<Icon as={Plus} color="white" w={5} h={5} />}
            variant="ghost"
            size="sm"
            bg="romanSilver.200"
            isRound
          />
        </Center>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box padding="0" w="100%">
          {tasks.map((task, index) => {
            return (
              <Draggable index={index} draggableId={task._id} key={task._id}>
                {(provided) => (
                  <ProjectSectionsTaskItem
                    provided={provided}
                    innerRef={provided.innerRef}
                    memberPermission={memberPermission}
                    projectId={projectId}
                    sectionName={section.name}
                    tasks={tasks}
                    setTasks={setTasks}
                    task={task}
                    color={color}
                    jwtToken={user.jwtToken}
                  />
                )}
              </Draggable>
            );
          })}
          <Flex flex={13}>
            <HStack spacing="0" flex={13}>
              {memberPermission === 'edit' ? (
                <>
                  <Box w="2.4em"></Box>
                  <Input
                    border="1px solid"
                    borderColor="romanSilver.200"
                    borderLeft="10px solid"
                    borderLeftColor="rufous.100"
                    borderRadius="0"
                    placeholder="+ Nueva tarea..."
                    focusBorderColor="rufous.200"
                    onKeyUp={handleNewTask}
                  />
                </>
              ) : null}
            </HStack>
          </Flex>
        </Box>
      </Collapse>
      <Box h="10"></Box>
    </ul>
  );
}
