import {
  VStack,
  Center,
  Flex,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Select,
  useToast,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  PopoverArrow,
  HStack,
  Box,
  IconButton,
  Icon,
  Portal,
  Text,
  Stack,
} from '@chakra-ui/react';
import SuggestionItem from '../../../components/suggestionItem';
import { Edit } from 'react-feather';
import { CirclePicker } from 'react-color';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { parseCookies } from '../../../lib/parseCookies';
import departamentos from '../../../data/departamentos';
import colorArray from '../../../theme/colors';
import Autosuggest from 'react-autosuggest';
import Axios from 'axios';
import theme from '../../../styles/suggestionTheme.module.css';
import MembersList from '../../../components/memberList';

export default function NewTeamPage({
  initialUser,
  setShow,
  user,
  setUser,
  users,
}) {
  const { register, handleSubmit, errors } = useForm();
  const [color, setColor] = useState('green.500');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [members, setMembers] = useState([]);
  const [suggestionValue, setSuggestionValue] = useState('');
  const Router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setShow(false);
  });

  const onSubmit = async (data) => {
    setLoading(true);
    let filterMembers = members.map((member) => {
      return {
        member_id: member._id,
        permissions: member.permissions,
        role: member.role,
      };
    });
    filterMembers.push({
      member_id: user.user.id,
      permissions: 'edit',
      role: 'Creador',
    });
    console.log(filterMembers);
    try {
      await Axios.post(
        `/api/teams`,
        {
          name: data.name,
          creator: user.user.id,
          color: color,
          members: filterMembers,
          areaConocimiento: data.department,
          projects: [],
        },
        {
          headers: {
            Authorization: user.jwtToken,
          },
        }
      );
      setLoading(false);
      toast({
        duration: 9000,
        isClosable: true,
        title: 'Exito.',
        description: 'Se ha creado el equipo correctamente',
        position: 'top',
        status: 'success',
      });
      Router.replace(`/${user.user.id}/my-teams`);
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      toast({
        duration: 9000,
        isClosable: true,
        title: 'Ha ocurrido un error.',
        description: 'Intente más tarde',
        position: 'top',
        status: 'error',
      });
    }
  };

  const onCancel = () => {
    Router.replace(`/${user.user.id}/my-teams`);
  };

  const onChangeColor = (color) => {
    setColor(color.hex);
  };

  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const addMember = (memberUser) => {
    console.log(members);
    const withoutDuplicates = members.filter(
      (member) => member._id !== memberUser._id
    );
    setMembers([...withoutDuplicates, memberUser]);
  };

  //Autosuggest Settings
  const getSuggestions = (value) => {
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
  };

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
    <Stack
      w="100%"
      h="100vh"
      padding="2em"
      align="center"
      justify="start"
      overflowY="scroll">
      <VStack
        padding="2em"
        marginBottom="2em"
        boxShadow="-2px 2px 8px 2px rgba(0,0,0,0.10)"
        spacing="1em"
        justify="start"
        w="60%"
        borderRadius="10px">
        <Heading as="h3" color="richBlack.500">
          Nuevo Equipo
        </Heading>
        <form style={{ width: '100%' }}>
          <VStack spacing="1em" w="100%">
            <FormControl>
              <Flex w="100%" alignItems="center">
                <FormLabel w="40%" color="romanSilver.800">
                  Nombre del Equipo
                </FormLabel>
                <Spacer />
                <Input
                  name="name"
                  ref={register({ required: true })}
                  type="text"
                  w="100%"
                  className="input"
                />
              </Flex>
              {errors.name?.type === 'required' && (
                <Flex w="100%">
                  <Spacer />
                  <Text w="70%" color="red.500">
                    El campo es requerido
                  </Text>
                </Flex>
              )}
            </FormControl>
            <FormControl>
              <Flex w="100%" alignItems="center">
                <FormLabel w="40%" color="romanSilver.800">
                  Departamento
                </FormLabel>
                <Spacer />
                <Select
                  margin="0px"
                  name="department"
                  ref={register({ required: true })}
                  w="100%"
                  placeholder="Seleccione..."
                  className="input">
                  {departamentos.map((departamento) => {
                    return <option>{departamento}</option>;
                  })}
                </Select>
              </Flex>
            </FormControl>
            <Flex w="100%" alignItems="center">
              <Text w="42%" color="romanSilver.800">
                Seleccione un Color
              </Text>
              <Spacer />
              <HStack spacing="0.5em" align="center" w="100%">
                <Box w={5} h={5} bgColor={color} borderRadius="5px"></Box>
                <Popover
                  placement="right"
                  orientation="vertical"
                  isLazy
                  isOpen={isOpen}>
                  <PopoverTrigger>
                    <IconButton
                      isRound
                      icon={<Icon as={Edit} />}
                      variant="ghost"
                      onClick={open}
                    />
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent w="29em" h="16.5em">
                      <PopoverArrow />
                      <PopoverBody
                        alignContent="center"
                        alignItems="center"
                        width="556px">
                        <CirclePicker
                          colors={colorArray}
                          width="28em"
                          circleSize={20}
                          circleSpacing={8}
                          onChange={onChangeColor}
                        />
                      </PopoverBody>
                      <PopoverFooter d="flex" justifyContent="flex-end">
                        <Button
                          bgColor="rufous.500"
                          className="button"
                          color="white"
                          borderRadius="100px"
                          onClick={close}>
                          Aplicar
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </HStack>
            </Flex>
          </VStack>
        </form>
        <VStack justify="start" align="start" w="100%" spacing="0.5em">
          <Heading as="h5" fontSize="xl" color="richBlack.500">
            Invitar Miembros
          </Heading>
          <Autosuggest
            theme={theme}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            renderInputComponent={renderInputComponent}
          />
          <VStack spacing="0" w="100%">
            <MembersList members={members} setMembers={setMembers} />
          </VStack>
        </VStack>
      </VStack>
      <Flex justify="space-between" w="100%">
        <Button
          bgColor="gray"
          borderRadius="30px"
          padding="1.5em"
          color="richBlack.500"
          onClick={onCancel}>
          Cancelar
        </Button>
        <Spacer />
        <Button
          bgColor="rufous.500"
          className="button"
          borderRadius="30px"
          padding="1.5em"
          color="white"
          isLoading={loading}
          onClick={handleSubmit(onSubmit)}>
          Finalizar
        </Button>
      </Flex>
    </Stack>
  );
}

export async function getServerSideProps({ req }) {
  const userCookie = parseCookies(req);
  const user = JSON.parse(userCookie.user);
  if (user) {
    try {
      const users = await Axios.get(`http://localhost:3000/api/users`, {
        headers: {
          Authorization: user.jwtToken,
        },
      });
      return {
        props: {
          initialUser: user,
          isError: false,
          users: users.data,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        props: {
          initialUser: user,
          isError: true,
          users: [],
        },
      };
    }
  }
  return {
    props: {
      initialUser: null,
      isError: true,
      users: [],
    },
  };
}
