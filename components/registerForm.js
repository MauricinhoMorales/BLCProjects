import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Heading,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  Flex,
  Checkbox,
  Button,
  Spacer,
  HStack,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { Mail, Eye, EyeOff, User } from 'react-feather';
import { useForm } from 'react-hook-form';
import Axios from 'axios';

export default function RegisterForm({ setUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, getValues, errors } = useForm();
  const Router = useRouter();
  const toast = useToast();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const RegisterResponse = await Axios.post('api/auth/signup', {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        isAdmin: false,
      });
      if (RegisterResponse.status === 200) {
        setIsLoading(false);
        console.log(RegisterResponse.data);
        Router.replace(`/sentEmail/activation/${RegisterResponse.data}`);
      } else {
        toast({
          title: 'Ha ocurrido un error.',
          description: 'Intente más tarde.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast({
        title: 'Ha ocurrido un error.',
        description: 'Intente más tarde.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  const [show, setShow] = React.useState(false);
  const [showVerified, setShowVerified] = useState(false);
  const handleClick = () => setShow(!show);
  const handleVerified = () => setShowVerified(!showVerified);

  return (
    <VStack spacing="2em">
      <Heading as="h3" size="lg" color="rufous.500">
        Registrate en BLCProjects
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <VStack spacing="2em">
          <HStack spacing="2em">
            <FormControl isInvalid={errors.firstName}>
              <InputGroup>
                <Input
                  size="lg"
                  name="firstName"
                  ref={register({ required: true })}
                  type="text"
                  placeholder="Nombre"
                  w="100%"
                  className="input"
                />
                <InputRightElement
                  paddingTop="0.5em"
                  pointerEvents="none"
                  children={
                    <Icon as={User} color="romanSilver.900" w={5} h={5} />
                  }
                />
              </InputGroup>
              {errors.firstName?.type === 'required' && (
                <FormErrorMessage>El campo es requerido</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.lastName}>
              <InputGroup>
                <Input
                  size="lg"
                  name="lastName"
                  ref={register({ required: true })}
                  type="text"
                  placeholder="Apellido"
                  w="100%"
                  className="input"
                />
                <InputRightElement
                  paddingTop="0.5em"
                  pointerEvents="none"
                  children={
                    <Icon as={User} color="romanSilver.900" w={5} h={5} />
                  }
                />
              </InputGroup>
              {errors.lastName?.type === 'required' && (
                <FormErrorMessage>El campo es requerido</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <Input
                size="lg"
                name="email"
                ref={register({
                  required: true,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                type="text"
                placeholder="Correo Electronico"
                w="100%"
                className="input"
              />
              <InputRightElement
                paddingTop="0.5em"
                pointerEvents="none"
                children={
                  <Icon as={Mail} color="romanSilver.900" w={5} h={5} />
                }
              />
            </InputGroup>
            {errors.email?.type === 'required' && (
              <FormErrorMessage>El campo es requerido</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <InputGroup>
              <Input
                size="lg"
                w="100%"
                name="password"
                ref={register({ required: true })}
                className="input"
                type={show ? 'text' : 'password'}
                placeholder="Contraseña"
              />
              <InputRightElement>
                <IconButton
                  marginTop="0.5em"
                  marginRight="0.5em"
                  className="password-button"
                  aria-label="Show Password"
                  alignSelf="center"
                  size="md"
                  icon={
                    <Icon as={!show ? EyeOff : Eye} color="romanSilver.900" />
                  }
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {errors.password?.type === 'required' && (
              <FormErrorMessage>El campo es requerido</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.verifiedPassword}>
            <InputGroup>
              <Input
                size="lg"
                w="100%"
                name="verifiedPassword"
                ref={register({
                  required: true,
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValues();
                      return (
                        password === value || 'Las contraseñas no coinciden'
                      );
                    },
                  },
                })}
                className="input"
                type={showVerified ? 'text' : 'password'}
                placeholder="Repita Contraseña"
              />
              <InputRightElement>
                <IconButton
                  marginTop="0.5em"
                  marginRight="0.5em"
                  className="password-button"
                  aria-label="Show Verified Password"
                  alignSelf="center"
                  size="md"
                  icon={
                    <Icon
                      as={!showVerified ? EyeOff : Eye}
                      color="romanSilver.900"
                    />
                  }
                  onClick={handleVerified}
                />
              </InputRightElement>
            </InputGroup>
            {errors.verifiedPassword?.type === 'required' && (
              <FormErrorMessage>El campo es requerido</FormErrorMessage>
            )}
            {errors.verifiedPassword?.type === 'validate' && (
              <FormErrorMessage>
                {errors.verifiedPassword.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <Button
            bgColor="rufous.500"
            borderRadius="30px"
            padding="1.5em"
            w="100%"
            isLoading={isLoading}
            className="button"
            type="submit"
            color="white">
            REGISTRATE
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}
