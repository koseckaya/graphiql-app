import '../styles/global.css';
import '../firebase';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';

import { AuthContextProvider } from '../context/contextAuth';
import { wrapper } from '../rtk/store';
import ErrorBoundary from './ErrorBoundary';

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default appWithTranslation(MyApp);
