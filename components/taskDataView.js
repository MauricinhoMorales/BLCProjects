import React, { useEffect } from 'react';
import { useState } from 'react';
import { CheckIcon, Icon, BellIcon } from '@chakra-ui/icons';
import { IoMdThumbsUp, IoIosCalendar } from 'react-icons/io';
import {
  IoAttach,
  IoLink,
  IoGitMerge,
  IoEllipsisHorizontal,
  IoClose,
} from 'react-icons/io5';

import DescriptionControl from './descriptionControl';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Divider,
  Box,
  Stack,
  IconButton,
  Spacer,
  Flex,
  Text,
  Center,
  Avatar,
  Tag,
  TagLabel,
  TagCloseButton,
  ModalCloseButton,
  PopoverArrow,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';

export default function TaskDataView({
  task,
  tasks,
  setTasks,
  status,
  statusColor,
  priority,
  priorityColor,
  onCloseParent,
  project,
  member,
  members,
  memberPermision,
}) {
  const [isOpen, changeIsOpen] = useState(true);
  const [value, onChange] = useState(() => {
    return task.dueDate && task.dueDate.start
      ? new Date(task.dueDate.start)
      : '';
  });
  const [variant, setVariant] = useState('outline');
  const [mensajeMarcado, setMensajeMarcado] = useState('Marcar como terminada');

  const [like, setLike] = useState('false');
  const [colorLike, setColorLike] = useState('gray');

  const PressMark = () => {
    if (variant == 'outline') {
      setVariant('solid');
      setMensajeMarcado('Marcada como finalizada');
    } else {
      setVariant('outline');
      setMensajeMarcado('Marcar como finalizada');
    }
  };

  const PressLike = () => {
    if (like == 'false') {
      setLike('true');
      setColorLike('blue');
    } else {
      setLike('false');
      setColorLike('gray');
    }
  };

  const onClose = () => {
    changeIsOpen(false);
    onCloseParent();
  };

  return (
    <>
      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="60rem">
          <ModalHeader>
            <Box bg="white" color="white" h={1} px={2} />
            <Flex w="95%">
              <Button
                leftIcon={<CheckIcon />}
                colorScheme="green"
                variant={variant}
                height="24px"
                onClick={PressMark}>
                {mensajeMarcado}
              </Button>
              <Spacer />
              <IconButton
                variant="link"
                colorScheme="gray"
                fontSize="22px"
                icon={<Icon as={IoAttach} />}
              />
              <IconButton
                variant="link"
                colorScheme={colorLike}
                fontSize="22px"
                onClick={PressLike}
                icon={<Icon as={IoMdThumbsUp} />}
              />
              <IconButton
                variant="link"
                colorScheme="gray"
                fontSize="22px"
                icon={<Icon as={IoLink} />}
              />
              <IconButton
                variant="link"
                colorScheme="gray"
                fontSize="22px"
                icon={<Icon as={IoGitMerge} />}
              />
              <IconButton
                variant="link"
                colorScheme="gray"
                fontSize="22px"
                icon={<Icon as={IoEllipsisHorizontal} />}
              />
            </Flex>
            <Box bg="white" color="white" h={4} px={2} />
            <Divider orientation="horizontal" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="column" spacing={4}>
              <Stack direction="row" spacing={8}>
                <Box color="black">
                  <Text fontSize="3xl" color="black">
                    {task.name}
                  </Text>
                </Box>
              </Stack>
              <Box width="1" />
              <Stack direction="row" spacing={0}>
                <Stack direction="column" spacing={8}>
                  <Box fontSize="md" height="6">
                    <Text color="gray.500">Responsable</Text>
                  </Box>
                  <Box fontSize="md" height="6" width="40" textAlign="left">
                    <Text color="gray.500" fontSize="md">
                      Fecha de Entrega
                    </Text>
                  </Box>
                  <Box fontSize="md" height="6">
                    <Text color="gray.500">Etiquetas</Text>
                  </Box>
                  <Box fontSize="md" height="6">
                    <Text color="gray.500">Descripción</Text>
                  </Box>
                </Stack>
                <Stack direction="column" spacing={8}>
                  <Box fontSize="md" height="6" textAlign="left">
                    <Stack direction="row" spacing={4} align="center">
                      {memberPermision === 'edit' ? (
                        <Popover>
                          <PopoverTrigger>
                            <Button
                              variant="ghost"
                              borderRadius="100px"
                              padding="0"
                              margin="0">
                              <Avatar
                                size="sm"
                                name={`${member.firstName} ${member.lastName}`}
                                textColor="white"
                              />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody></PopoverBody>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Avatar size="sm" />
                      )}
                      {member._id ? (
                        <Text>{`${member.firstName} ${member.lastName}`}</Text>
                      ) : (
                        <Text>Sin Asignar</Text>
                      )}
                    </Stack>
                  </Box>
                  <Box fontSize="md" height="6" textAlign="left" margin="0">
                    <Stack direction="row" spacing={4}>
                      <Center h="6" w="8">
                        <IconButton
                          borderRadius="full"
                          variant="outline"
                          colorScheme="green"
                          fontSize="md"
                          icon={<Icon as={IoIosCalendar} />}
                        />
                      </Center>
                      <Text>{value !== '' ? value.toDateString() : ''}</Text>
                    </Stack>
                  </Box>
                  <Box fontSize="md" height="6" textAlign="left">
                    <Stack direction="row" spacing={4}>
                      <Tag
                        size="md"
                        key="md"
                        borderRadius="full"
                        variant="solid"
                        bg={project.color}>
                        <TagLabel>Proyecto</TagLabel>
                        <Box width="3" />
                        <TagLabel>
                          <Text textColor="gray.300">{project.name}</Text>
                        </TagLabel>
                      </Tag>
                      <Tag
                        size="md"
                        key="md"
                        borderRadius="full"
                        variant="solid"
                        colorScheme={statusColor || 'gray'}>
                        <TagLabel>Estado</TagLabel>
                        <Box width="3" />
                        <TagLabel>
                          <Text textColor="gray.300">{status || ''}</Text>
                        </TagLabel>
                      </Tag>
                      <Tag
                        size="md"
                        key="md"
                        borderRadius="full"
                        variant="solid"
                        colorScheme={priorityColor || 'gray'}>
                        <TagLabel>Prioridad</TagLabel>
                        <Box width="3" />
                        <TagLabel>
                          <Text textColor="gray.300">{priority || ''}</Text>
                        </TagLabel>
                      </Tag>
                    </Stack>
                  </Box>
                  <DescriptionControl descripcionTarea={task.description} />
                </Stack>
                <Box width="1" />
              </Stack>
              <Box height="1"></Box>
            </Stack>
            <Divider orientation="horizontal" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
