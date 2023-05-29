import Layout from '@/components/Layout';
import '@/styles/bootstrap.min.css';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}
