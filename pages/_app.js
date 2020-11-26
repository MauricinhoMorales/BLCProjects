import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../components/layout';
import theme from '../theme/index';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(
    /* {
      jwtToken: '',
      user: {
        firstName: '',
        lastName: '',
        email: '',
        isAdmin: '',
      },
    } */ null
  );

  return (
    <ChakraProvider theme={theme}>
      <Layout user={user} setUser={setUser}>
        <Component {...pageProps} user={user} setUser={setUser} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
