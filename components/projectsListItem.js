import { useEffect, useState } from 'react';
import {
  Box,
  HStack,
  Text,
  Icon,
  Stack,
  Flex,
  Spacer,
  MenuButton,
  IconButton,
  Menu,
  MenuDivider,
  MenuList,
  MenuItem,
  Modal,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Button,
  VStack,
  Input,
  Textarea,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import Axios from 'axios';
import { Edit, MoreVertical, Trash } from 'react-feather';
import { useRouter } from 'next/router';

export default function projectsListItem({
  project,
  creatorName,
  userName,
  userId,
  jwtToken,
  url,
  projects,
  setProjects,
}) {
  const [teamCreatorName, setTeamCreatorName] = useState('Personal');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [inputValue, setInputValue] = useState(project.name);
  const [descriptionValue, setDescriptionValue] = useState(project.description);
  const [loading, setLoading] = useState(false);
  const Router = useRouter();
  const toast = useToast();

  useEffect(async () => {
    if (userName !== creatorName) {
      try {
        const team = await Axios.get(`/api/teams/${creatorName}`, {
          headers: {
            Authorization: jwtToken,
          },
        });
        setTeamCreatorName(team.data.name);
      } catch (err) {
        console.log(err.response);
      }
    }
  }, []);

  const handleClick = async (e) => {
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
      let myProjects = projects;
      myProjects.map((projectItem, index) => {
        if (projectItem._id === project._id) {
          myProjects[index].name = inputValue;
          myProjects[index].description = descriptionValue;
        }
      });
      setProjects(myProjects);
      onClose();
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  };

  const onDeleteProject = async () => {
    try {
      await Axios.delete(`/api/projects/${project._id}`, {
        headers: {
          Authorization: jwtToken,
        },
      });
      const myProjects = projects.filter(
        (otherProject) => otherProject._id !== project._id
      );
      setProjects(myProjects);
    } catch (err) {
      console.log(err.response);
      toast({
        title: 'Error.',
        description: 'Ha ocurrido un error al intentar eliminar el proyecto.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const onOpenDelete = () => {
    setOpenDelete(true);
  };

  const onCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <Box
        w="17em"
        h="17em"
        marginBottom="3em"
        borderRadius="10px"
        boxShadow="-2px 2px 8px 2px rgba(0,0,0,0.10)"
        _hover={{ cursor: 'pointer' }}
        onClick={handleClick}>
        <Box
          w="100%"
          h="11em"
          bg={project.color || 'green.500'}
          borderRadius="10px 10px 0px 0px"
          padding="1em"></Box>
        <HStack
          spacing="0.4em"
          align="center"
          padding="1em"
          justify="center"
          w="100%"
          h="6em">
          <Stack spacing="0.3em" align="start" justify="center" w="90%">
            <Text fontWeight="bold" color="richBlack.500" fontSize="lg">
              {project.name}
            </Text>
            <Text color="richBlack.200" fontSize="md">
              {teamCreatorName}
            </Text>
          </Stack>
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              isRound
              variant="ghost"
              id="menuButton"
              icon={<Icon as={MoreVertical} color="romanSilver.500" />}
            />
            <MenuList overflowY="hidden">
              <MenuItem
                id="inviteMember"
                iconSpacing="8px"
                onClick={onOpen}
                icon={<Icon as={Edit} />}>
                Editar Proyecto
              </MenuItem>
              <MenuDivider />
              <MenuItem
                iconSpacing="8px"
                onClick={onOpenDelete}
                color="red.500"
                icon={<Icon as={Trash} color="red.500" />}
                _hover={{ bg: 'red.100' }}>
                Eliminar Proyecto
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
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
      <Modal
        motionPreset="scale"
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        closeOnOverlayClick={false}
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmación de eliminación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="richBlack.500">
              ¿Está seguro que desea eliminar este Proyecto?
            </Text>
            <br />
            <Text color="richBlack.500">
              También se procederá a eliminar las tareas que fueron creadas en
              este projecto.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%">
              <Button
                colorScheme="gray"
                onClick={onCloseDelete}
                borderRadius="100px">
                Cancel
              </Button>
              <Spacer />
              <Button
                colorScheme="red"
                borderRadius="100px"
                onClick={onDeleteProject}>
                Eliminar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
