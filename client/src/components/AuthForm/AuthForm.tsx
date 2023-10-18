import { MAIN_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '#/libs/constants/routes';
import { isErrorWithMessage } from '#/libs/helpers/isErrorWithMessage';
import { isFetchBaseQueryError } from '#/libs/helpers/isFetchBaseQueryError';
import { FetchError } from '#/store/api';
import { userApi } from '#/store/reducers/user/UserApi';
import { setCredentials } from '#/store/reducers/user/UserSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { StyledInput } from '../Input/Input';
import Spinner from '../Spinner/Spinner';
import { Text } from '../Text/Text';

const StyledAuthFormContainer = styled(Flex)`
  width: 100%;

  @media ${({ theme }) => theme.media.lg} {
    width: 40%;
  }

  @media ${({ theme }) => theme.media.md} {
    width: 50%;
  }
`;

const StyledAuthForm = styled.form`
  width: clamp(250px, 100%, 350px);
  padding: 12px;

  @media ${({ theme }) => theme.media.sm} {
    padding: 0px;
  }
`;

const StyledAuthFormLabel = styled(Text)`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const StyledAuthFormHeader = styled(Text)`
  margin-bottom: 10px;
`;

const StyledAuthFormButton = styled(Button)`
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StyledAuthFormLink = styled(Text)`
  font-family: 'Lato';
  margin-top: 10px;
  & a {
    color: ${({ theme }) => theme.colors.secondary};
    font-family: 'Lato';
    text-decoration: none;
  }

  & a:hover {
    opacity: 0.85;
  }
`;

type FormData = {
  email: string;
  password: string;
};

export function AuthForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === SIGN_IN_ROUTE;

  const [signIn, { isLoading: signInIsLoading }] = userApi.useSignInMutation();
  const [signUp, { isLoading: signUpIsLoading }] = userApi.useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const handleLogin = async (formData: FormData) => {
    await signIn(formData)
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
        navigate(MAIN_ROUTE);
      })
      .catch((error) => {
        if (isErrorWithMessage(error)) {
          toast.error(error.message);
        } else if (isFetchBaseQueryError(error)) {
          const errMsg = 'error' in error ? error.error : (error as FetchError).data.message;
          toast.error(errMsg);
        }
      });
  };

  const handleRegistration = async (formData: FormData) => {
    await signUp(formData)
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
        navigate(MAIN_ROUTE);
      })
      .catch((error) => {
        if (isErrorWithMessage(error)) {
          toast.error(error.message);
        } else if (isFetchBaseQueryError(error)) {
          const errMsg = 'error' in error ? error.error : (error as FetchError).data.message;
          toast.error(errMsg);
        }
      });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isLogin) {
      return handleLogin(data);
    }
    return handleRegistration(data);
  };

  return (
    <StyledAuthFormContainer $center>
      <StyledAuthForm onSubmit={handleSubmit(onSubmit)}>
        <StyledAuthFormHeader as="h1" $size={28}>
          {isLogin ? 'Login' : 'Sign Up'}
        </StyledAuthFormHeader>
        <StyledAuthFormLabel htmlFor="email" as="label" $size={14}>
          Email
          <StyledInput
            placeholder="Email"
            type="text"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email'
              }
            })}
          />
          {errors.email && <Text $color="red">{errors.email.message}</Text>}
        </StyledAuthFormLabel>

        <div>
          <StyledAuthFormLabel as="label" htmlFor="password" $size={14}>
            Password
            <StyledInput
              placeholder="Password"
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 4,
                  message: 'Password must be at least 4 characters'
                }
              })}
            />
            {errors.password && <Text $color="red">{errors.password.message}</Text>}
          </StyledAuthFormLabel>
        </div>

        <Flex $justifyEnd>
          <StyledAuthFormLink $size={14} $weight="bold">
            <Link to="/">Forgot password?</Link>
          </StyledAuthFormLink>
        </Flex>

        <StyledAuthFormButton $variant="primary" type="submit">
          {isLogin ? 'Sign In' : 'Sign Up'}
          {(signInIsLoading || signUpIsLoading) && <Spinner $size={22} />}
        </StyledAuthFormButton>

        <Flex $center>
          <span>
            {isLogin ? (
              <StyledAuthFormLink $size={14} $weight="bold">
                Don&apos;t have an account? <Link to={SIGN_UP_ROUTE}>Sign Up</Link>
              </StyledAuthFormLink>
            ) : (
              <StyledAuthFormLink $size={14} $weight="bold">
                Have an account? <Link to={SIGN_IN_ROUTE}>Sign In</Link>
              </StyledAuthFormLink>
            )}
          </span>
        </Flex>
      </StyledAuthForm>
    </StyledAuthFormContainer>
  );
}
