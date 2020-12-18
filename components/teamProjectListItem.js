import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  VStack,
  Flex,
  IconButton,
  Icon,
  Center,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Modal,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Input,
  Textarea,
  useDisclosure,
  ModalOverlay,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { MoreVertical } from 'react-feather';
import { useState } from 'react';
import Axios from 'axios';

export default function TeamProjectListItem({
  project,
  userId,
  jwtToken,
  setTeamProjects,
  teamProjects,
}) {
  const Router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState(project.name);
  const [descriptionValue, setDescriptionValue] = useState(project.description);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTeamProjects(teamProjects);
  });

  const seeProjectDetail = (e) => {
    if (
      e.target.localName !== 'button' &&
      e.target.tagName !== 'svg' &&
      e.target.tagName !== 'circle' &&
      !e.target.id.includes('menuitem')
    ) {
      Router.replace(`/${userId}/my-projects/${project._id}`);
    }
  };

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onChangeTextArea = (e) => {
    setDescriptionValue(e.target.value);
  };

  const onClickChange = async () => {
    setLoading(true);
    try {
      await Axios.put(
        `/api/projects/${project._id}`,
        {
          name: inputValue,
          description: descriptionValue,
        },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      let projects = teamProjects;
      teamProjects.map((projectItem, index) => {
        if (projectItem._id === project._id) {
          projects[index].name = inputValue;
          projects[index].description = descriptionValue;
        }
      });
      setTeamProjects(projects);
      onClose();
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  };

  return (
    <>
      <Box
        borderRadius="10px"
        padding="1.5em"
        boxShadow="-2px 2px 8px 2px rgba(0,0,0,0.10)"
        _hover={{ cursor: 'pointer' }}
        onClick={seeProjectDetail}>
        <VStack
          spacing="0.3em"
          w="100%"
          h="100%"
          justify="center"
          align="start">
          <Heading as="h3" fontSize="2xl" color="richBlack.500">
            {project.name}
          </Heading>
          <Flex justifyContent="space-between" w="100%">
            <Center h="auto" w="100%" justifyContent="start">
              <Text fontWeight="normal" color="gray.400">
                {project.description.slice(0, 60) + '...'}
              </Text>
            </Center>
            <Menu>
              <MenuButton>
                <IconButton
                  variant="ghost"
                  isRound
                  icon={<Icon as={MoreVertical} color="romanSilver.500" />}
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onOpen}>Editar</MenuItem>
                <MenuDivider />
                <MenuItem>Eliminar</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </VStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Proyecto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="0.5em" w="100%" h="100%" align="start">
              <Text fontWeight="bold" color="richBlack.500">
                Nombre del Proyecto
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
              onClick={onClickChange}>
              Guardar Cambios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
