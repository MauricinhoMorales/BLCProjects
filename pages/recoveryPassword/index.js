import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Heading,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Button,
  FormControl,
  FormErrorMessage,
  Center,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Mail } from 'react-feather';
import { useForm } from 'react-hook-form';
import Axios from 'axios';

export default function RecoveryPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const Router = useRouter();
  const toast = useToast();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const recoveryResponse = await Axios.post(
        'api/email/recoveryPassword/' + data.email
      );
      if (recoveryResponse.status === 200) {
        setIsLoading(false);
        console.log(recoveryResponse.data);
        Router.replace('/sentEmail/recovery/' + data.email);
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

  return (
    <Center w="100%" h="100vh" padding="0 30em">
      <VStack spacing="2em">
        <Heading as="h3" size="lg" color="rufous.500">
          Recupera tu cotraseña
        </Heading>
        <Text textAlign="center">
          Introduce tu correo electrónico para comenzar con el proceso de
          recuperación.
        </Text>
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
            <Button
              bgColor="rufous.500"
              borderRadius="30px"
              padding="1.5em"
              w="100%"
              isLoading={isLoading}
              className="button"
              type="submit"
              color="white">
              Enviar Correo
            </Button>
          </VStack>
        </form>
      </VStack>
    </Center>
  );
}
