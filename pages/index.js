import '../styles/globals.less';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home(props) {
  const router = useRouter();

  useEffect(() => {
    if (props.loggedIn) {
      router.push(`/my-tasks`);
    }
    router.push('/login');
  });
  return null;
}
