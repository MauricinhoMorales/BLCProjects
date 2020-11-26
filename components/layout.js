import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import NavBar from '../components/navBar';

export default function Layout({ user, setUser, children }) {
  return (
    <>
      {user !== null ? (
        <Flex bg="rufous.500" w="100%" h="100vh">
          <NavBar user={user} setUser={setUser} />
          <Box w="100%" h="100vh" bg="white">
            {React.cloneElement(children, { user })}
          </Box>
        </Flex>
      ) : (
        React.cloneElement(children, { user })
      )}
    </>
  );
}
