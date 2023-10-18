import { MAIN_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from './libs/constants/routes';
import { AuthPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage
  },
  {
    path: SIGN_IN_ROUTE,
    Component: AuthPage
  },
  {
    path: SIGN_UP_ROUTE,
    Component: AuthPage
  }
];
