import {
  MAIN_ROUTE,
  RESET_PASSWORD_CONFIRM_ROUTE,
  RESET_PASSWORD_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE
} from './libs/constants/routes';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { ResetPasswordConfirmPage } from './pages/AuthPage/ResetPasswordConfirmPage';
import { ResetPasswordPage } from './pages/AuthPage/ResetPasswordPage';
import { MainPage } from './pages/MainPage';

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
    isNavBarShow: true
  },
  {
    path: SIGN_IN_ROUTE,
    Component: AuthPage
  },
  {
    path: SIGN_UP_ROUTE,
    Component: AuthPage
  },
  {
    path: RESET_PASSWORD_ROUTE,
    Component: ResetPasswordPage
  },
  {
    path: RESET_PASSWORD_CONFIRM_ROUTE,
    Component: ResetPasswordConfirmPage
  }
];
