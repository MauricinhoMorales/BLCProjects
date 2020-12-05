import { useState } from 'react';
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
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react';
import { ChevronDown, Plus } from 'react-feather';
import ProjectSectionsTaskItem from './projectSectionsTaskItem';
import Axios from 'axios';

export default function ProjectSectionsList({
  section,
  projectId,
  color,
  user,
  sections,
  setSections,
}) {
  const [tasks, setTasks] = useState(() => {
    return section.tasks || [];
  });
  const [isOpen, setIsOpen] = useState(true);
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
    try {
      await Axios.put(
        `/api/projects/${projectId}/sections`,
        {
          oldSectionName: section.name,
          newSectionName: e,
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
          oldSections[index].name = e;
        }
      });
      setSections(oldSections);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
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
              <MenuDivider />
              <MenuItem>Renombrar seccion</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => handleOnSelect('delete')}>
                Eliminar Seccion
              </MenuItem>
            </MenuList>
          </Menu>
          <Editable
            w="100%"
            _hover={{ border: `1px dotted ${color}`, borderRadius: '5px' }}
            _focus={{ border: `3px solid ${color}` }}
            _focusVisible={{ border: `3px solid ${color}` }}
            as="h3"
            submitOnBlur={false}
            color="richBlack.500"
            border="1px solid white"
            fontSize="xl"
            fontWeight="bold"
            onSubmit={handleChangeNameSection}
            defaultValue={section.name}>
            <EditablePreview />
            <EditableInput />
          </Editable>
          {/* <Heading as="h4" color="richBlack.500" fontSize="xl">
            {section.name}
          </Heading> */}
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
        {tasks.map((task) => {
          return (
            <ProjectSectionsTaskItem
              projectId={projectId}
              sectionName={section.name}
              tasks={tasks}
              setTasks={setTasks}
              task={task}
              color={color}
              jwtToken={user.jwtToken}
            />
          );
        })}
        <Flex flex={13}>
          <HStack spacing="0" flex={13}>
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
          </HStack>
        </Flex>
      </Collapse>

      <Box h="10"></Box>
    </>
  );
}
