import React, { useState } from 'react';
import { FlexboxGrid, Loader } from 'rsuite';
import Navbar from '../components/nav';

import '../styles/globals.less';

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  if (loggedIn && user._id) {
    return (
      <FlexboxGrid className="full-container" fluid>
        <FlexboxGrid.Item colspan={4}>
          <Navbar />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={20} className="overlay container-padding">
          <Component
            {...pageProps}
            user={user}
            setUser={setUser}
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
