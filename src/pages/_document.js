import { Html, Head, Main, NextScript } from 'next/document';
import { publicRuntimeConfig } from '../../next.config';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='UTF_8' />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.css'
          integrity='sha512-DanfxWBasQtq+RtkNAEDTdX4Q6BPCJQ/kexi/RftcP0BcA4NIJPSi7i31Vl+Yl5OCfgZkdJmCqz+byTOIIRboQ=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-7RKXFKG7NZ'
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-7RKXFKG7NZ');
              `,
          }}
        ></script>

        <script
          src='https://kit.fontawesome.com/7aa005f0fe.js'
          crossOrigin='anonymous'
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
