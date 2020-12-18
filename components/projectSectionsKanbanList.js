import { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  HStack,
  VStack,
  Heading,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
  Spacer,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Textarea,
  useDisclosure,
  ModalOverlay,
  ModalFooter,
  Box,
  Text,
} from '@chakra-ui/react';
import { MoreVertical, Plus } from 'react-feather';
import ProjectSectionsKanbanTaskItem from './projectSectionsKanbanTaskItem';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export default function ProjectSectionsKanbanList({
  section,
  projectId,
  color,
  user,
  sections,
  setSections,
  memberPermission,
  index,
}) {
  const [tasks, setTasks] = useState(() => {
    return section.tasks || [];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(section.name);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Message from ProjectSectionKanbanList');
    setTasks(section.tasks);
  }, [sections]);

  const handleNewTask = async () => {
    setLoading(true);
    try {
      const newTask = await Axios.post(
        `/api/tasks`,
        {
          name: inputValue,
          description: descriptionValue,
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
      let mySections = sections;
      sections.map((mySection, index) => {
        if (mySection.name === section.name) {
          mySections[index].tasks = [...tasks, task.data];
        }
      });
      setSections(mySections);
      onClose();
    } catch (err) {
      console.log(err.response);
    }
    setInputValue('');
    setDescriptionValue('');
    setLoading(false);
  };

  const handleOnSelect = async (nameSection) => {
    switch (nameSection) {
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

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onChangeTextArea = (e) => {
    setDescriptionValue(e.target.value);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Droppable droppableId={`${index}`}>
        {(provided) => (
          <>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ width: '18em' }}>
              <VStack
                borderRadius="5px"
                padding="0.8em"
                spacing="0.5em"
                align="start"
                justify="start"
                bg={color}
                h="auto"
                w="18em">
                <Flex w="100%" marginBottom="0.5em" align="center">
                  {memberPermission === 'edit' && isEditing ? (
                    <Input
                      w="100%"
                      color="white"
                      fontSize="lg"
                      value={value}
                      onChange={onChange}
                      onKeyUp={handleChangeNameSection}
                    />
                  ) : (
                    <>
                      <Heading
                        as="h6"
                        color="white"
                        fontWeight="normal"
                        fontSize="lg">{`${section.name} | ${tasks.length} ${
                        tasks.length === 1 ? 'item' : 'items'
                      }`}</Heading>
                      <Spacer />
                      {memberPermission === 'edit' ? (
                        <Menu>
                          <MenuButton>
                            <IconButton
                              isRound
                              size="sm"
                              variant="ghost"
                              icon={
                                <Icon
                                  as={MoreVertical}
                                  color="white"
                                  w={4}
                                  h={4}
                                />
                              }
                            />
                          </MenuButton>
                          <MenuList>
                            <MenuItem onClick={() => handleOnSelect('rename')}>
                              Renombrar Columna
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={() => handleOnSelect('delete')}>
                              Eliminar Columna
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      ) : null}
                    </>
                  )}
                </Flex>
                <Box w="100%">
                  {tasks.map((task, index) => (
                    <Draggable
                      index={index}
                      draggableId={task._id}
                      key={task._id}>
                      {(provided) => (
                        <ProjectSectionsKanbanTaskItem
                          provided={provided}
                          innerRef={provided.innerRef}
                          memberPermission={memberPermission}
                          projectId={projectId}
                          sectionName={section.name}
                          tasks={tasks}
                          setTasks={setTasks}
                          sections={sections}
                          setSections={setSections}
                          task={task}
                          color={color}
                          jwtToken={user.jwtToken}
                        />
                      )}
                    </Draggable>
                  ))}
                </Box>
                {provided.placeholder}
                <Button
                  w="100%"
                  leftIcon={<Icon as={Plus} color="white" />}
                  padding="0.5em 0"
                  margin="0"
                  justifyContent="start"
                  fontWeight="normal"
                  bg={color}
                  onClick={onOpen}
                  _hover={{ bg: { color }, filter: 'saturate(70%)' }}
                  color="white">
                  Agregar Tarea
                </Button>
              </VStack>
            </div>
          </>
        )}
      </Droppable>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nueva Tarea</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="0.5em" w="100%" h="100%" align="start">
              <Text fontWeight="bold" color="richBlack.500">
                Nombre
              </Text>
              <Input
                className="input"
                value={inputValue}
                onChange={onChangeInput}
              />
              <Box h="0.5em" />
              <Text fontWeight="bold" color="richBlack.500">
                Descripción
              </Text>
              <Textarea
                className="input"
                value={descriptionValue}
                onChange={onChangeTextArea}
              />
            </VStack>
          </ModalBody>
          <ModalFooter alignContent="flex-end">
            <Button
              isLoading={loading}
              variant="primary"
              bg="rufous.500"
              color="white"
              borderRadius="100px"
              className="button"
              onClick={handleNewTask}>
              Crear Tarea
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
