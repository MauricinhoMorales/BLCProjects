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
  Checkbox,
  Button,
  Spacer,
  HStack,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { Mail, Eye, EyeOff } from 'react-feather';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { useCookies } from 'react-cookie';

export default function LoginForm({ apiToken, setUser, setShowNav }) {
  const [cookie, setCookie] = useCookies(['user']);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const Router = useRouter();
  const toast = useToast();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const loginResponse = await Axios.post('api/auth/login', {
        email: data.email,
        password: data.password,
        apiKeyToken: apiToken,
      });
      setCookie('user', JSON.stringify(loginResponse.data), {
        path: '/',
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        sameSite: true,
      });
      setIsLoading(false);
      setUser(loginResponse.data);
      setShowNav(true);
      Router.replace(`${loginResponse.data.user.id}/my-tasks`);
    } catch (err) {
      console.log(err.response);
      setIsLoading(false);
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
  const handleForgot = () => {
    Router.replace(`/recoveryPassword`);
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <VStack spacing="2em">
      <Heading as="h3" size="lg" color="rufous.500">
        Iniciar Sesión en BLCProjects
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <VStack spacing="2em">
          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <Input
                size="lg"
                name="email"
                ref={register({ required: true })}
                type="email"
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
          <HStack justify="start" spacing="2em">
            <Checkbox
              size="md"
              colorScheme="red"
              defaultIsChecked
              ref={register()}
              name="rememberme">
              Recuérdame
            </Checkbox>
            <Spacer />
            <Button variant="link" color="richBlack.500" onClick={handleForgot}>
              ¿Olvidaste tu Contraseña?
            </Button>
          </HStack>
          <Button
            bgColor="rufous.500"
            borderRadius="30px"
            padding="1.5em"
            w="100%"
            isLoading={isLoading}
            className="button"
            type="submit"
            color="white">
            INICIAR SESIÓN
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}
