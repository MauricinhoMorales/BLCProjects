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
  Input,
  useDisclosure,
  useToast,
  Select,
  Box,
  AvatarGroup,
  Tooltip,
  Badge,
} from '@chakra-ui/react';
import Axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [otherTeams, setOtherTeams] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(member.role);
  const [selectValue, setSelectValue] = useState('edit');
  const toast = useToast();

  useEffect(async () => {
    try {
      const response = await Axios.get(`/api/teams`, {
        headers: {
          Authorization: jwtToken,
        },
      });
      const filterList = response.data.filter(
        (otherTeam) => otherTeam._id !== teamId
      );
      const otherTeamsList = filterList.filter((otherTeam) => {
        for (let i = 0; i < otherTeam.members.length; i++) {
          if (otherTeam.members[i].member_id === member.member_id) {
            return otherTeam;
          }
        }
      });
      setOtherTeams(otherTeamsList);
    } catch (err) {
      console.log(err.response);
    }
  }, []);

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
    console.log(err.response);
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
      console.log(err.response);
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

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onEditEnable = () => {
    setEditing(true);
  };

  const onEditDisable = () => {
    setEditing(false);
  };

  const onSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const onEditMember = async () => {
    try {
      await Axios.put(
        `/api/teams/${teamId}/members`,
        {
          member_id: member.member_id,
          role: inputValue,
          permissions: selectValue,
        },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      let members = teamMembers;
      teamMembers.map((teamMember, index) => {
        if (teamMember.member_id === member.member_id) {
          members[index].role = inputValue;
          members[index].permissions = selectValue;
        }
      });
      setTeamMembers(members);
    } catch (err) {
      console.log(err.response);
    }
    onEditDisable();
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
          {thisMemberPermission === 'edit' && isEditing ? (
            <Input
              className="input"
              w="80%"
              value={inputValue}
              onChange={onChangeInput}
            />
          ) : (
            <Text color="richBlack.500" fontSize="sm">
              {member.role}
            </Text>
          )}
        </Center>
        <Center h="auto" flex={5} justifyContent="start">
          {thisMemberPermission === 'edit' && isEditing ? (
            <Select placeholder="Seleccione" w="80%" onChange={onSelect}>
              <option
                value="edit"
                selected={member.permissions === 'edit' ? true : false}>
                Puede Editar
              </option>
              <option
                value="comment"
                selected={member.permissions === 'comment' ? true : false}>
                Puede Comentar
              </option>
              <option
                value="view"
                selected={member.permissions === 'view' ? true : false}>
                Puede Visualizar
              </option>
            </Select>
          ) : (
            <Text color="richBlack.500" fontSize="sm">
              {transformPermissionString(member.permissions)}
            </Text>
          )}
        </Center>
        <Center h="auto" w="100%" flex={8} justifyContent="start">
          {otherTeams.slice(0, 4).map((otherTeam, index) => (
            <Tooltip hasArrow label={otherTeam.name} shouldWrapChildren={false}>
              <Avatar
                bg={otherTeam.color}
                marginLeft={index !== 0 ? -2 : 0}
                border="2px solid white"
                size="sm"
                color="white"
                name={otherTeam.name}
              />
            </Tooltip>
          ))}
          {otherTeams.length - 4 > 0 ? (
            <Badge
              fontWeight="bold"
              color="white"
              bg="blue.800"
              borderRadius="100px"
              padding="0.1em 0.8em">
              {otherTeams.length - 4} +
            </Badge>
          ) : null}
        </Center>
        <Center h="auto" w="100%" flex={2} justifyContent="flex-end">
          {thisMemberPermission === 'edit' ? (
            <Menu>
              <MenuButton padding="0.5em" borderRadius="100px">
                <Icon as={MoreVertical} color="romanSilver.600" />
              </MenuButton>
              <MenuList>
                <MenuItem
                  isDisabled={
                    member.role === 'Creador' || thisMemberPermission !== 'edit'
                      ? true
                      : false
                  }
                  iconSpacing="0.5em"
                  iconSpacing="8px"
                  onClick={onEditEnable}
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
      {thisMemberPermission === 'edit' && isEditing ? (
        <Flex flex={13} padding="0 2em" justifyContent="flex-end">
          <Button
            onClick={onEditMember}
            margin="0"
            borderRadius="100px"
            variant="primary"
            backgroundColor="rufous.500"
            className="button"
            color="white">
            Guardar Cambios
          </Button>
        </Flex>
      ) : null}

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
