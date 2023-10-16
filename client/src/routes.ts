import { AUTH_ROUTE, MAIN_ROUTE } from './libs/constants/routes';
import { AuthPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage
  },
  {
    path: AUTH_ROUTE,
    Component: AuthPage
  }
];
