import {
  Flex,
  Box,
  Text,
  Editable,
  EditablePreview,
  EditableInput,
  IconButton,
  Icon,
  Center,
  Select,
} from '@chakra-ui/react';
import { Delete, Trash } from 'react-feather';
import colorArray from '../theme/colors';

export default function MemberItem({ member, index, setMembers, members }) {
  const setRandomColor = () => {
    return Math.floor(Math.random() * Math.floor(colorArray.length));
  };

  const onChangePermissions = (e) => {
    let newMember = member;
    newMember.permissions = e.target.value;
    let newMembers = members;
    newMembers[index] = newMember;
    setMembers(newMembers);
  };

  const onChangeRole = (e) => {
    let newMember = member;
    newMember.role = e;
    let newMembers = members;
    newMembers[index] = newMember;
    setMembers(newMembers);
  };

  const deleteInvitation = () => {
    let newMembers = members.filter(
      (oldMember) => oldMember._id !== member._id
    );
    setMembers(newMembers);
  };
  return (
    <Flex flex={20} w="100%">
      <Box padding="0.8em 0 0.8em 0.8em" flex={5} w="100%">
        <Text
          color="richBlack.500"
          fontSize="sm">{`${member.firstName} ${member.lastName}`}</Text>
      </Box>
      <Box padding="0.8em 0" flex={7} w="100%">
        <Text color="richBlack.500" fontSize="sm">
          {member.email}
        </Text>
      </Box>
      <Box padding="0.8em 0" flex={4} w="100%">
        <Editable
          w="90%"
          placeholder="Desarrollador"
          onChange={onChangeRole}
          color="richBlack.500"
          fontSize="sm">
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Box>
      <Box padding="0.8em 0" flex={4} w="100%">
        <Select placeholder="Permisos..." onChange={onChangePermissions}>
          <option value="edit">Puede Editar</option>
          <option value="comment">Puede Comentar</option>
          <option value="view">Puede Visualizar</option>
        </Select>
      </Box>
      <Center flex={2} w="100%">
        <IconButton
          size={20}
          onClick={deleteInvitation}
          icon={<Icon as={Trash} color="richBlack.500" w={4} h={4} />}
        />
      </Center>
    </Flex>
  );
}
