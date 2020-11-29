import { useEffect, useState } from 'react';
import {
  Box,
  HStack,
  WrapItem,
  Text,
  Icon,
  Stack,
  MenuButton,
  IconButton,
  Menu,
  MenuDivider,
  MenuList,
  MenuItem,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import Axios from 'axios';
import { MoreVertical, Trash, UserPlus } from 'react-feather';
import { useRouter } from 'next/router';

export default function projectsListItem({
  project,
  creatorName,
  userName,
  jwtToken,
  userId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();
  const toast = useToast();
  const handleClick = async (e) => {
    if (e.target.id !== 'menuButton') {
      setIsLoading(true);
      debugger;
      try {
        const response = await Axios.get(`/api/projects/${project._id}`, {
          headers: {
            Authorization: jwtToken,
          },
        });
        setIsLoading(false);
        Router.replace(`/${userId}/my-projects/${response.data._id}`);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast({
          title: 'Ha ocurrido un error.',
          description: 'Intente de nuevo.',
          isClosable: true,
          status: 'error',
          duration: 9000,
          position: 'top',
        });
      }
    }
  };

  const onSelect = (selection) => {
    console.log(selection);
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
          padding="1em">
          {isLoading ? (
            <Spinner speed="0.65" color="white" thickness="4px" size="sm" />
          ) : null}
        </Box>
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
              {creatorName === userName ? 'Personal' : creatorName}
            </Text>
          </Stack>
          <Menu isLazy onClose={onSelect}>
            <MenuButton
              as={IconButton}
              isRound
              variant="ghost"
              icon={
                <Icon
                  as={MoreVertical}
                  color="romanSilver.500"
                  id="menuButton"
                />
              }
            />
            <MenuList overflowY="hidden">
              <MenuItem
                id="inviteMember"
                iconSpacing="8px"
                isDisabled
                icon={<Icon as={UserPlus} />}>
                Invitar miembro
              </MenuItem>
              <MenuDivider />
              <MenuItem
                iconSpacing="8px"
                color="red.500"
                icon={<Icon as={Trash} color="red.500" />}
                _hover={{ bg: 'red.100' }}>
                Eliminar Proyecto
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
    </>
  );
}
