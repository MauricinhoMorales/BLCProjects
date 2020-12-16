import {
  Avatar,
  Flex,
  HStack,
  VStack,
  Text,
  Center,
  IconButton,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Spacer,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Axios from 'axios';
import { Edit, MoreVertical, Trash } from 'react-feather';

export default function TeamDetailMemberItem({
  member,
  thisMemberPermission,
  teamId,
  jwtToken,
  setTeamMembers,
  teamMembers,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const transformPermissionString = (permission) => {
    switch (permission) {
      case 'edit':
        return 'Puede Editar';
      case 'comment':
        return 'Puede Comentar';
      case 'view':
        return 'Puede Visualizar';
    }
  };

  const onMenuSelect = (selection) => {
    console.log(selection);
    if (selection.target.innerText === 'Eliminar Miembro') {
      onOpen();
    }
  };

  const onDeleteMember = async () => {
    try {
      await Axios.delete(`/api/teams/${teamId}/members`, {
        params: {
          memberId: member.member_id,
        },
        headers: {
          Authorization: jwtToken,
        },
      });
      const remainingMembers = teamMembers.filter(
        (oldMember) => oldMember.member_id !== member.member_id
      );
      setTeamMembers(remainingMembers);
    } catch (err) {
      console.log(err);
      toast({
        title: 'Ha ocurrido un error.',
        description: 'No se ha podido eliminar al miembro. Intente nuevamente',
        isClosable: true,
        duration: 9000,
        position: 'top',
        status: 'error',
      });
    }
  };

  return (
    <>
      <Flex padding="1em 1.5em">
        <HStack w="100%" flex={8} spacing="0.5em">
          <Avatar
            name={`${member.firstName} ${member.lastName}`}
            color="white"
          />
          <VStack spacing="0" align="start">
            <Text
              color="richBlack.500"
              fontSize="sm">{`${member.firstName} ${member.lastName}`}</Text>
            <Text fontSize="sm" color="romanSilver.500">
              {member.email}
            </Text>
          </VStack>
        </HStack>
        <Center h="auto" flex={5} justifyContent="start">
          <Text color="richBlack.500" fontSize="sm">
            {member.role}
          </Text>
        </Center>
        <Center h="auto" flex={5} justifyContent="start">
          <Text color="richBlack.500" fontSize="sm">
            {transformPermissionString(member.permissions)}
          </Text>
        </Center>
        <Center h="auto" w="100%" flex={8} justifyItems="start"></Center>
        <Center h="auto" w="100%" flex={2} justifyContent="flex-end">
          {thisMemberPermission === 'edit' ? (
            <Menu>
              <MenuButton padding="0.5em" borderRadius="100px">
                <Icon as={MoreVertical} color="romanSilver.600" />
              </MenuButton>
              <MenuList>
                <MenuItem
                  isDisabled={member.role === 'Creador' ? true : false}
                  iconSpacing="0.5em"
                  iconSpacing="8px"
                  icon={<Icon as={Edit} w={4} h={4} color="romanSilver.500" />}>
                  <Text color="romanSilver.500">Editar Miembro</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  isDisabled={member.role === 'Creador' ? true : false}
                  onClick={onMenuSelect}
                  _hover={{ bg: 'red.100' }}
                  iconSpacing="8px"
                  icon={<Icon as={Trash} w={4} h={4} color="red.500" />}>
                  <Text color="red.500">Eliminar Miembro</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : null}
        </Center>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmación de eliminación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="richBlack.500">
              ¿Está seguro que desea eliminar este Miembro?
            </Text>
            <br />
            <Text color="richBlack.500">
              Este miembro ya no tendrá acceso a los proyectos gestionados por
              este equipo.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%">
              <Button colorScheme="gray" onClick={onClose} borderRadius="100px">
                Cancel
              </Button>
              <Spacer />
              <Button
                colorScheme="red"
                borderRadius="100px"
                onClick={onDeleteMember}>
                Eliminar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
