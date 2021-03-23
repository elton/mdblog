import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: `${process.env.NEXT_PUBLIC_ROOT_URL}`,
          site_name: 'My Blog App',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
