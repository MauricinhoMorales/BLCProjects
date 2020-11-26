import React, { useEffect } from 'react';
import Axios from 'axios';
import { Stack } from '@chakra-ui/react';
import ActivatedAccount from '../../components/activatedAccount';
import CodeInvalid from '../../components/codeInvalid';

export default function ActivationPage({ isActivated }) {
  /* return <h1>{isActivated ? 'Account Active' : 'Code Invalid'}</h1>; */
  return (
    <Stack spacing="2em" align="center" justify="center" w="100%" h="100vh">
      {isActivated ? <ActivatedAccount /> : <CodeInvalid />}
    </Stack>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await Axios.get(
      `${process.env.URL}/api/auth/activate/${context.params.activationCode}`
    );
    if (response.status === 200) {
      return {
        props: {
          isActivated: true,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        isActivated: false,
      },
    };
  }
  return {
    props: {
      isActivated: false,
    },
  };
}
