import { Avatar, HStack, VStack, Text } from '@chakra-ui/react';

export default function SuggetionItem({ user }) {
  return (
    <HStack
      spacing="10px"
      align="center"
      padding="0.5em"
      bg="white"
      _hover={{ cursor: 'pointer' }}>
      <Avatar
        name={`${user.firstName} ${user.lastName}`}
        color="white"></Avatar>
      <VStack spacing="3px" justify="start" align="start">
        <Text
          color="romanSilver.700"
          fontSize="md">{`${user.firstName} ${user.lastName}`}</Text>
        <Text color="romanSilver.700" fontSize="sm">
          {user.email}
        </Text>
      </VStack>
    </HStack>
  );
}
