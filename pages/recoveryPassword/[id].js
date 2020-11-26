import { Center, Stack } from '@chakra-ui/react';
import React from 'react';
import RecoveryForm from '../../components/recoveryForm';
import CodeInvalid from '../../components/codeInvalid';
import Axios from 'axios';

export default function RecoveryPasswordPage({ isValid, userId }) {
  return (
    <Stack align="center" justify="center" w="100%" h="100vh">
      {isValid ? <RecoveryForm userId={userId} /> : <CodeInvalid />}
    </Stack>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await Axios.get(
      'http://localhost:3000/api/auth/recovery/' + context.query.id
    );
    return {
      props: {
        isValid: true,
        userId: context.query.id,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        isValid: false,
      },
    };
  }
}
