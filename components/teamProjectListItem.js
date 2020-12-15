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
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { Menu, MoreVertical } from 'react-feather';

export default function TeamProjectListItem({ project, userId }) {
  const Router = useRouter();

  const seeProjectDetail = (e) => {
    if (
      e.target.tagName !== 'button' &&
      e.target.tagName !== 'svg' &&
      e.target.tagName !== 'circle' &&
      !e.target.id.includes('menuitem')
    ) {
      Router.replace(`/${userId}/my-projects/${project._id}`);
    }
  };

  return (
    <Box
      borderRadius="10px"
      padding="1.5em"
      boxShadow="-2px 2px 8px 2px rgba(0,0,0,0.10)"
      _hover={{ cursor: 'pointer' }}
      onClick={seeProjectDetail}>
      <VStack
        bg="red.50"
        spacing="0.3em"
        w="100%"
        h="100%"
        justify="center"
        align="start">
        <Heading as="h3" fontSize="2xl" color="richBlack.500">
          GE365
        </Heading>
        <Flex justifyContent="space-between" w="100%">
          <Center h="auto" w="100%" justifyContent="start">
            <Text fontWeight="normal" color="gray.400">
              {'Este es un proyecto de contabilidad que ayuda a las personas que no saben de contabilidad a realizar los pagons de nomina entre otras cosas'.slice(
                0,
                60
              ) + '...'}
            </Text>
          </Center>
          <Menu>
            <MenuButton padding="0.5em" borderRadius="100px">
              <Icon as={MoreVertical} color="romanSilver.500" />
            </MenuButton>
            <MenuList>
              <MenuItem>Editar</MenuItem>
              <MenuDivider />
              <MenuItem>Eliminar</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </VStack>
    </Box>
  );
}
