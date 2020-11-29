import React, { useEffect } from 'react';
import { Box, Flex, Center, Spinner, Heading } from '@chakra-ui/react';
import NavBar from '../components/navBar';

export default function Layout(props) {
  return (
    <>
      {props.show ? (
        <Flex bg="rufous.500" w="100%" h="100vh" overflowY="hidden">
          <NavBar
            user={props.user}
            setUser={props.setUser}
            setShow={props.setShow}
          />
          <Box w="100%" h="100%" bg="white" overflowY="auto">
            {props.loading ? (
              <Center w="100%" h="100%">
                <Spinner
                  thickness="4px"
                  size="lg"
                  color="richBlack.200"
                  speed="0.65s"
                />
              </Center>
            ) : props.error ? (
              <Heading as="h1">Error</Heading>
            ) : (
              React.cloneElement(props.children, {
                user: props.user,
                setShow: props.setShow,
              })
            )}
          </Box>
        </Flex>
      ) : (
        React.cloneElement(props.children, { user: props.user })
      )}
    </>
  );
}
