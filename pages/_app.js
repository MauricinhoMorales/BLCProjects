import { FlexboxGrid } from 'rsuite';
import { useRouter } from 'next/router';
import Navbar from '../components/nav';
import '../styles/globals.less';
import { useEffect } from 'react';

const useUser = () => ({ user: true, loading: false });

function MyApp({ Component, pageProps }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/login');
    }
  }, [user, loading]);

  if (!user) {
    return <Component {...pageProps} />;
  } else {
    return (
      <FlexboxGrid className="full-container" fluid>
        <FlexboxGrid.Item colspan={4}>
          <Navbar />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={20} className="overlay container-padding">
          <Component {...pageProps} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  }
}

export default MyApp;
