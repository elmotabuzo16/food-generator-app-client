import Layout from '@/components/Layout';
import '@/styles/bootstrap.min.css';
import '@/styles/globals.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
