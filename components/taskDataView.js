import React from 'react';
import { useState } from 'react';
import { CheckIcon, Icon, BellIcon } from '@chakra-ui/icons';
import { IoMdThumbsUp, IoIosCalendar } from 'react-icons/io';
import { IoAttach, IoLink, IoGitMerge, IoEllipsisHorizontal, IoClose } from 'react-icons/io5';

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
  TagCloseButton
} from "@chakra-ui/react";

export default function TaskDataView(props){

  const [isOpen, changeIsOpen] = useState(true);
  const [variant, setVariant] = useState("outline");
  const [mensajeMarcado, setMensajeMarcado] = useState("Marcar como terminada");

  const [like, setLike] = useState("false");
  const [colorLike, setColorLike] = useState("gray");

  const PressMark = () => {
    if (variant == "outline") {
      setVariant("solid");
      setMensajeMarcado("Marcada como finalizada");
    } else {
      setVariant("outline");
      setMensajeMarcado("Marcar como finalizada");
    }
  };

  const PressLike = () => {
    if (like == "false") {
      setLike("true");
      setColorLike("blue");
    } else {
      setLike("false");
      setColorLike("gray");
    }
  };

  const onClose = () => {
    changeIsOpen(false);
  };

  return (
    <>
    <Modal isOpen={isOpen} size='xl' >
      <ModalOverlay />

      <ModalContent maxW="60rem">

        <ModalHeader>
          <Box bg="white" color="white" h={1} px={2} />
          <Flex>
            <Button leftIcon={<CheckIcon />}
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
            <IconButton
              variant="link"
              colorScheme="gray"
              fontSize="22px"
              onClick={props.hideTask}
              icon={<Icon as={IoClose} />}
            />
          </Flex>
          <Box bg="white" color="white" h={4} px={2} />
          <Divider orientation="horizontal" />
        </ModalHeader>

        <ModalBody >
          <Stack direction="column" spacing={4}>
            <Stack direction="row" spacing={8}>
              <Box color="black">
                <Text fontSize="3xl" color="black">{props.nombreTarea}</Text>
              </Box>
            </Stack>
            <Box width="1" />
            <Stack direction="row" spacing={0}>
              <Stack direction="column" spacing={8}>
                <Box fontSize="md" height="6">
                  <Text color="gray.500">Responsable</Text>
                </Box>
                <Box fontSize="md" height="6" width="40" textAlign="left">
                  <Text color="gray.500" fontSize="md">Fecha de Entrega</Text>
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
                  <Stack direction="row" spacing={4}>
                    <Center h="6" w="8">
                      <Avatar size="sm" name={props.nombreResponsable} textColor="white" />
                    </Center>
                    <Text>{props.nombreResponsable}</Text>
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
                  <Text>{props.fechaEntrega.toDateString()}</Text>
                  </Stack>
                </Box>
                <Box fontSize="md" height="6" textAlign="left">
                  <Stack direction="row" spacing={4}>
                    <Tag
                      size="md"
                      key="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme ={props.color}
                    >
                      <TagLabel>Proyecto</TagLabel>
                      <Box width="3" />
                      <TagLabel><Text textColor="gray.300">{props.nombreProyecto}</Text></TagLabel>
                    </Tag>
                    <Tag
                      size="md"
                      key="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme ={props.colorEstado}
                    >
                      <TagLabel>Estado</TagLabel>
                      <Box width="3" />
                      <TagLabel><Text textColor="gray.300">{props.estadoProyecto}</Text></TagLabel>
                    </Tag>
                    <Tag
                      size="md"
                      key="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme ={props.colorPrioridad}
                    >
                      <TagLabel>Prioridad</TagLabel>
                      <Box width="3" />
                      <TagLabel><Text textColor="gray.300">{props.prioridad}</Text></TagLabel>
                    </Tag>
                  </Stack>
                </Box>
                <DescriptionControl descripcionTarea={props.descripcionTarea}/>
              </Stack>
              <Box width="1" />
            </Stack>
            <Box height="1"></Box>
          </Stack>
          <Divider orientation="horizontal" />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost"
            leftIcon={<BellIcon />}
            onClick={props.hideTask}
            size="sl"
            colorScheme="red">
            Abandonar Tarea
            </Button>
        </ModalFooter>

      </ModalContent>

    </Modal>
    </>
  );
}
