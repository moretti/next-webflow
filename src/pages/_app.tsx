import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavigationBar from '../components/NavigationBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh ',
      }}
    >
      <div
        style={{
          flex: 1,
        }}
      >
        <NavigationBar />
        <Component {...pageProps} />
      </div>

      <footer
        style={{
          padding: '20px',
          textAlign: 'center',
        }}
      >
        Example of static footer injected by Next
      </footer>
    </div>
  );
}

export default MyApp;
