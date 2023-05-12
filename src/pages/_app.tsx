import '../styles/global.css';
import 'graphiql/graphiql.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { wrapper } from '../rtk/store';

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
