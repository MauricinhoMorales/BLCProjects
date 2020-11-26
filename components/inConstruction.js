import { Stack, VStack, Icon, Heading, Text } from '@chakra-ui/react';
import { Frown } from 'react-feather';

export default function InConstruction() {
  return (
    <Stack spacing="2em" align="center" justify="center" w="100%" h="100%">
      <VStack spacing="8px">
        <Icon as={Frown} color="tyrianPurple.800" w={48} h={48} />
        <Heading as="h1">Página en Construcción</Heading>
      </VStack>
      <Text fontWeight="normal" size="lg" color="richBlack.500">
        Seguimos trabajando en ello...
      </Text>
    </Stack>
  );
}
