import '../styles/globals.css';
import React from 'react';
import { Provider } from 'next-auth/client';
import { DefaultSeo } from 'next-seo';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function MyApp({ Component, pageProps }) {
  // 确保每个用户每个请求的数据独立
  const queryClientRef = React.useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
