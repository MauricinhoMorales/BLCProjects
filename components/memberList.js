import { Flex, Heading, Box, List } from '@chakra-ui/react';
import MemberItem from './memberItem';

export default function MembersList({ members, setMembers }) {
  return (
    <>
      <Flex flex={20} w="100%" marginTop="2em">
        <Box
          bg="romanSilver.50"
          padding="0.8em 0 0.8em 0.8em"
          w="100%"
          flex={5}
          borderTopLeftRadius="10px">
          <Heading
            as="h6"
            color="romanSilver.500"
            fontSize="md"
            fontWeight="medium">
            Nombre
          </Heading>
        </Box>
        <Box bg="romanSilver.50" padding="0.8em 0" w="100%" flex={7}>
          <Heading
            as="h6"
            color="romanSilver.500"
            fontSize="md"
            fontWeight="medium">
            Correo Electronico
          </Heading>
        </Box>
        <Box bg="romanSilver.50" padding="0.8em 0" w="100%" flex={4}>
          <Heading
            as="h6"
            color="romanSilver.500"
            fontSize="md"
            fontWeight="medium">
            Cargo
          </Heading>
        </Box>
        <Box bg="romanSilver.50" padding="0.8em 0" w="100%" flex={4}>
          <Heading
            as="h6"
            color="romanSilver.500"
            fontSize="md"
            fontWeight="medium">
            Permisos
          </Heading>
        </Box>
        <Box
          flex={2}
          w="100%"
          bg="romanSilver.50"
          borderTopRightRadius="10px"></Box>
      </Flex>

      {members.map((member, index) => {
        return (
          <MemberItem
            member={member}
            members={members}
            setMembers={setMembers}
            index={index}
          />
        );
      })}
    </>
  );
}
