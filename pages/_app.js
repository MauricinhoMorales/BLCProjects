import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import { parseCookies } from '../lib/parseCookies';
import Router from 'next/router';

import Layout from '../components/layout';
import theme from '../theme/index';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(() => {
    if (pageProps.initialUser) {
      return pageProps.initialUser;
    }
    return { jwtToken: '', user: { id: '', lastName: '', firstName: '' } };
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  useEffect(() => {
    const start = () => {
      console.log('start');
      setError(false);
      setLoading(true);
    };
    const end = () => {
      console.log('findished');
      setLoading(false);
    };

    const errorEnd = () => {
      setError(true);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', errorEnd);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', errorEnd);
    };
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Layout
        user={user}
        setUser={setUser}
        setShow={setShow}
        show={show}
        loading={loading}
        error={error}>
        <CookiesProvider>
          <Component
            {...pageProps}
            user={user}
            setUser={setUser}
            setShow={setShow}
          />
        </CookiesProvider>
      </Layout>
    </ChakraProvider>
  );
}

export async function getInitialProps({ req }) {
  const user = parseCookies(req);

  return {
    props: {
      initialUser: JSON.parse(user.user),
    },
  };
}

export default MyApp;
