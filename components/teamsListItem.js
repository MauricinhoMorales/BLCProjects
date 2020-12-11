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
  useToast,
} from '@chakra-ui/react';
import Axios from 'axios';
import { MoreVertical, Trash, UserPlus } from 'react-feather';
import { useRouter } from 'next/router';

export default function TeamsListItem({
  team,
  membersCount,
  userId,
  jwtToken,
  url,
}) {
  const Router = useRouter();
  const toast = useToast();
  const handleClick = async (e) => {
    if (
      e.target.tagName !== 'button' &&
      e.target.tagName !== 'svg' &&
      e.target.tagName !== 'circle'
    ) {
      Router.replace(`/${userId}/my-teams/${team._id}`);
    }
  };

  const onSelect = async (selection) => {
    if (selection.target.innerText === 'Eliminar Equipo') {
      try {
        await Axios.delete(`${url}/api/teams/${team._id}`, {
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
    }
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
                id="inviteMember"
                iconSpacing="8px"
                isDisabled
                icon={<Icon as={UserPlus} />}>
                Invitar miembro
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={(e) => onSelect(e)}
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
    </>
  );
}
