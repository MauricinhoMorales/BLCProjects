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
  Button,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'react-feather';
import { useForm } from 'react-hook-form';
import Axios from 'axios';

export default function LoginForm({ userId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, getValues, errors } = useForm();
  const Router = useRouter();
  const toast = useToast();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await Axios.post(`/api/auth/recovery/${userId}`, {
        password: data.password,
      });
      setIsLoading(false);
      toast({
        title: 'Exito.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      Router.replace(`/login`);
    } catch (err) {
      setIsLoading(false);
      console.log(err.response.data);
      toast({
        title: 'Ha ocurrido un error.',
        description: 'Intente más tarde.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const [show, setShow] = React.useState(false);
  const [showVerified, setShowVerified] = useState(false);
  const handleClick = () => setShow(!show);
  const handleVerified = () => setShowVerified(!showVerified);

  return (
    <VStack spacing="2em">
      <Heading as="h3" size="lg" color="rufous.500">
        Recuperación de Contraseña
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <VStack spacing="2em">
          <FormControl isInvalid={errors.password}>
            <InputGroup>
              <Input
                size="lg"
                w="100%"
                name="password"
                ref={register({ required: true })}
                className="input"
                type={show ? 'text' : 'password'}
                placeholder="Nueva Contraseña"
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
            SIGUIENTE
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}
