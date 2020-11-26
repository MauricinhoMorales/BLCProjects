import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Center,
  Image,
  VStack,
  Box,
  Spacer,
  Avatar,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
} from '@chakra-ui/react';
import {
  Folder,
  MessageSquare,
  List,
  Users,
  Settings,
  User,
  LogOut,
} from 'react-feather';
import NavItem from './navItem';

export default function NavBar({ user, setUser }) {
  const [selectionState, setSelectionState] = useState([
    true,
    false,
    false,
    false,
  ]);
  const Router = useRouter();

  const handleSelected = (option, route) => {
    let newSelection = [false, false, false, false];
    newSelection[option] = true;
    setSelectionState(newSelection);
    Router.replace(`/${user.user.id}/${route}`);
  };

  const handleSelect = (name) => {
    switch (name) {
      case 'profile':
        Router.replace(`/${user.user.id}/profile`);
        break;
      case 'settings':
        Router.replace(`/${user.user.id}/settings`);
        break;
      case 'logout':
        setUser(null);
        Router.replace('/login');
        break;
    }
  };

  return (
    <Flex w="18em" h="100%" direction="column">
      <Center w="100%" h="4em" bg="white" padding="0.75em">
        <Image alt="BLCProjects Logo" src="/logo.gif" />
      </Center>
      <Box h="2em"></Box>
      <VStack spacing="0">
        <NavItem
          title="Mis Tareas"
          icon={List}
          isSelected={selectionState}
          handleSelect={handleSelected}
          option={0}
          route="my-tasks"
        />
        <NavItem
          title="Mis Equipos"
          icon={Users}
          isSelected={selectionState}
          handleSelect={handleSelected}
          option={1}
          route="my-teams"
        />
        <NavItem
          title="Mis Proyectos"
          icon={Folder}
          isSelected={selectionState}
          handleSelect={handleSelected}
          option={2}
          route="my-projects"
        />
        <NavItem
          title="Conversaciones"
          icon={MessageSquare}
          isSelected={selectionState}
          handleSelect={handleSelected}
          option={3}
          route="conversations"
        />
      </VStack>
      <Spacer />
      <Menu closeOnBlur={true} placement="top">
        <MenuButton as="button">
          <HStack
            className="popover"
            spacing="12px"
            w="100%"
            h="4em"
            padding="0.5em 1em"
            bg="rufous.800">
            <Avatar
              name={`${user.user.firstName} ${user.user.lastName}`}
              bg="romanSilver.50"
              color="white"
              size="sm"
            />
            <Text
              fontWeight="medium"
              color="white">{`${user.user.firstName} ${user.user.lastName}`}</Text>
          </HStack>
        </MenuButton>
        <MenuList minWidth="10em">
          <MenuItem
            id="profile"
            icon={<Icon as={User} />}
            iconSpacing="8px"
            onClick={() => handleSelect('profile')}>
            Mi Perfil
          </MenuItem>
          <MenuItem
            id="settings"
            icon={<Icon as={Settings} />}
            iconSpacing="8px"
            onClick={() => handleSelect('settings')}>
            Configuración
          </MenuItem>
          <MenuDivider />
          <MenuItem
            id="logout"
            icon={<Icon as={LogOut} />}
            iconSpacing="8px"
            onClick={() => handleSelect('logout')}>
            Cerrar Sesión
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
