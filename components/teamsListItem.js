import { useEffect, useState } from 'react';
import {
  Box,
  HStack,
  Text,
  Flex,
  Icon,
  Stack,
  MenuButton,
  IconButton,
  Menu,
  MenuDivider,
  MenuList,
  MenuItem,
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
  Heading,
  VStack,
  Input,
  Wrap,
} from '@chakra-ui/react';
import Axios from 'axios';
import { MoreVertical, Trash, UserPlus } from 'react-feather';
import { useRouter } from 'next/router';
import Autosuggest from 'react-autosuggest';

export default function TeamsListItem({
  team,
  membersCount,
  userId,
  jwtToken,
  users,
}) {
  const Router = useRouter();
  const toast = useToast();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionValue, setSuggestionValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const usersToInvite = users.filter((user) => {
    let isMember = false;
    for (let i = 0; i < team.members.length; i++) {
      if (user._id === team.members[i].member_id) {
        isMember = true;
        break;
      }
    }
    if (!isMember) {
      return user;
    }
  });

  const handleClick = async (e) => {
    console.log(e);
    if (
      e.target.tagName !== 'button' &&
      e.target.tagName !== 'svg' &&
      e.target.tagName !== 'circle' &&
      !e.target.id.includes('menuitem')
    ) {
      Router.replace(`/${userId}/my-teams/${team._id}`);
    }
  };

  const onDeleteTeam = async () => {
    try {
      await Axios.delete(`/api/teams/${team._id}`, {
        headers: {
          Authorization: jwtToken,
        },
      });
      Router.replace(Router.asPath);
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error.',
        description: 'Ha ocurrido un error al intentar eliminar el equipo.',
        duration: 9000,
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
  };

  const onSelect = (selection) => {
    console.log(selection);
    if (selection.target.innerText === 'Eliminar Equipo') {
      onOpen();
    } else if (selection.target.innerText === 'Invitar miembro') {
      onOpenInviteModal();
    }
  };

  const onOpenInviteModal = () => {
    setInviteModalOpen(true);
  };

  const onCloseInviteModal = () => {
    setInviteModalOpen(false);
  };

  //Autosuggest Settings
  /* const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : users.filter(
          (user) =>
            `${user.firstName} ${user.lastName}`
              .toLowerCase()
              .slice(0, inputLength) === inputValue ||
            user.email.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const renderSuggestion = (suggestion) => <SuggestionItem user={suggestion} />;
  const getSuggestionValue = (suggestion) => {
    let newSuggestion = suggestion;
    newSuggestion.permissions = '';
    newSuggestion.role = 'Desarrollador';
    addMember(newSuggestion);
    return '';
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  }; */

  const onChange = (event, { newValue }) => {
    setSuggestionValue(newValue);
  };

  const renderInputComponent = (inputProps) => (
    <Input {...inputProps} type="text" w="100%" className="input" />
  );

  const inputProps = {
    placeholder: 'Escriba un nombre...',
    value: suggestionValue,
    onChange,
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
          bg={team.color || 'green.500'}
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
              {team.name}
            </Text>
            <Text color="richBlack.200" fontSize="md">
              {`${membersCount} ${membersCount === 1 ? 'miembro' : 'miembros'}`}
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
                onClick={onSelect}
                id="inviteMember"
                iconSpacing="8px"
                icon={<Icon as={UserPlus} />}>
                Invitar miembro
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={onSelect}
                iconSpacing="8px"
                color="red.500"
                icon={<Icon as={Trash} color="red.500" />}
                _hover={{ bg: 'red.100' }}>
                Eliminar Equipo
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
      <Modal
        motionPreset="scale"
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
              ¿Está seguro que desea eliminar este Equipo?
            </Text>
            <br />
            <Text color="richBlack.500">
              También se procederá a eliminar los proyectos que fueron creados
              por este equipo.
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
                onClick={onDeleteTeam}>
                Eliminar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        motionPreset="scale"
        size="xl"
        isOpen={inviteModalOpen}
        onClose={onCloseInviteModal}
        closeOnOverlayClick={false}
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invitar Miembros a {team.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="0.5em" w="100%" justify="start" align="start">
              <Heading
                as="h5"
                color="richBlack.500"
                fontSize="md"
                fontWeight="bold">
                Agregar miembro
              </Heading>
              {/* <Autosuggest
                theme={theme}
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                renderInputComponent={renderInputComponent}
              /> */}
              <Heading
                paddingTop="1.5em"
                as="h5"
                color="richBlack.500"
                fontSize="md"
                fontWeight="bold">
                Miembros agregados
              </Heading>
              <Wrap
                padding="0.5em"
                w="100%"
                borderRadius="5px"
                border="1px"
                borderColor="blue.500"></Wrap>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%">
              <Button
                colorScheme="gray"
                onClick={onCloseInviteModal}
                borderRadius="100px">
                Cancel
              </Button>
              <Spacer />
              <Button
                bg={team.color}
                borderRadius="100px"
                onClick={onDeleteTeam}>
                Invitar Miembros
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
