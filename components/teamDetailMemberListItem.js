import {
  Avatar,
  Flex,
  HStack,
  VStack,
  Text,
  Center,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MoreVertical } from 'react-feather';

export default function TeamDetailMemberListItem({
  member,
  userId,
  thisMemberPermission,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const getPermissionsName = (permission) => {
    switch (permission) {
      case 'edit':
        return 'Puede Editar';
      case 'comment':
        return 'Puede Comentar';
      case 'view':
        return 'Puede visualizar';
    }
  };

  return (
    <Flex w="100%" padding="1em 1.5em">
      <HStack spacing="0.5em" justify="start" flex={7}>
        <Avatar
          name={`${member.firstName} ${member.lastName}`}
          size="md"
          color="white"
        />
        <VStack spacing="0" align="start">
          <Text
            fontSize="sm"
            color="richBlack.500">{`${member.firstName} ${member.lastName}`}</Text>
          <Text fontSize="sm" color="romanSilver.300">
            {member.email}
          </Text>
        </VStack>
      </HStack>
      <Center h="auto" justifyContent="start" flex={5}>
        <Text fontSize="sm" color="richBlack.500">
          {member.role}
        </Text>
      </Center>
      <Center h="auto" justifyContent="start" flex={5}>
        {isEditing ? null : (
          <Text fontSize="sm" color="richBlack.500">
            {getPermissionsName(member.permissions)}
          </Text>
        )}
      </Center>
      <Center h="auto" justifyContent="start" flex={7}></Center>
      <Center h="auto" justifyContent="flex-end" flex={2}>
        {thisMemberPermission === 'edit' ? (
          <IconButton
            size="sm"
            variant="ghost"
            isRound
            icon={<Icon as={MoreVertical} color="romanSilver.500" />}
          />
        ) : null}
      </Center>
    </Flex>
  );
}
