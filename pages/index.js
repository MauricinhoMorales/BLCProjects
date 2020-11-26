import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function HomePage({ user }) {
  const Router = useRouter();
  useEffect(() => {
    if (user !== null) {
      Router.replace(`${user.user.id}/my-tasks`);
    } else {
      Router.replace('/login');
    }
  }, [user]);

  return null;
}
