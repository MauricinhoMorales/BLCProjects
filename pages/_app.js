import React, { useState } from 'react';
import { FlexboxGrid, Loader } from 'rsuite';
import Navbar from '../components/nav';

import '../styles/globals.less';

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  if (loggedIn && JSON.parse(localStorage.getItem('user'))._id) {
    return (
      <FlexboxGrid className="full-container" fluid>
        <FlexboxGrid.Item colspan={4}>
          <Navbar />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={20} className="overlay container-padding">
          <Component
            {...pageProps}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  }
  return (
    <Component {...pageProps} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  );
}

export default MyApp;
