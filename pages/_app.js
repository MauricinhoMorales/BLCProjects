import { FlexboxGrid } from 'rsuite';
import Navbar from '../components/nav';
import '../styles/globals.less';

function MyApp({ Component, pageProps }) {
  return (
    <FlexboxGrid className="full-container" fluid>
      <FlexboxGrid.Item colspan={4}>
        <Navbar />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={20} className="overlay">
        <Component {...pageProps} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}

export default MyApp;
