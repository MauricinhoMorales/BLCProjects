import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/nav';
import { FlexboxGrid } from 'rsuite';
import { useRouter } from 'next/router';

import '../styles/globals.less';

export default function Layout(props) {
  const router = useRouter();
  // useEffect(() => {
  //   router.on.
  // });

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      {props.showNav ? (
        <FlexboxGrid className="full-container" fluid>
          <FlexboxGrid.Item colspan={4}>
            <Navbar />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={20} className="overlay container-padding">
            {props.children}
          </FlexboxGrid.Item>
        </FlexboxGrid>
      ) : (
        props.children
      )}
    </>
  );
}
