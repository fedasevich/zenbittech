import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { Navbar } from './components/Navbar/Navbar';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';
import { FullPageSpinner } from './components/Spinner/FullPageSpinner';
import { isErrorWithMessage } from './libs/helpers/isErrorWithMessage';
import { isFetchBaseQueryError } from './libs/helpers/isFetchBaseQueryError';
import { useAppDispatch } from './libs/hooks/redux';
import { FetchError } from './store/api';
import { userApi } from './store/reducers/user/UserApi';
import { logOut, setCredentials } from './store/reducers/user/UserSlice';
import { theme } from './themes/themes';

export default function App() {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem('token') as string;

  const [loading, setLoading] = useState(true);
  const [check] = userApi.useLazyCheckQuery();

  useEffect(() => {
    if (!token) {
      return setLoading(false);
    }
    check()
      .unwrap()
      .then((data) => {
        dispatch(
          setCredentials({
            user: { ...data },
            token: localStorage.getItem('token') as string
          })
        );
      })
      .catch((error) => {
        if (isErrorWithMessage(error)) {
          toast.error(error.message);
        } else if (isFetchBaseQueryError(error)) {
          const errMsg = 'error' in error ? error.error : (error as FetchError).data.message;
          toast.error(errMsg);
        }
        dispatch(logOut());
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <FullPageSpinner />;
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Navbar />
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}
