import { isErrorWithMessage } from '#/libs/helpers/isErrorWithMessage';
import { isFetchBaseQueryError } from '#/libs/helpers/isFetchBaseQueryError';
import { FetchError } from '#/store/api';
import { userApi } from '#/store/reducers/user/UserApi';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  StyledAuthForm,
  StyledAuthFormButton,
  StyledAuthFormContainer,
  StyledAuthFormHeader,
  StyledAuthFormLabel
} from '../AuthForm/AuthForm';

import { MAIN_ROUTE, SIGN_IN_ROUTE } from '#/libs/constants/routes';
import { useEffect } from 'react';
import { StyledInput } from '../Input/Input';
import { FullPageSpinner } from '../Spinner/FullPageSpinner';
import Spinner from '../Spinner/Spinner';
import { Text } from '../Text/Text';
import { ResetPasswordError } from './ResetPasswordError';

type FormData = {
  password: string;
  confirmPassword: string;
};

export function ResetPasswordConfirmForm() {
  const [resetPasswordConfirm, { isLoading }] = userApi.useResetPasswordConfirmMutation();
  const [validateResetPasswordToken, { isLoading: validateResetPasswordTokenIsLoading, error: validateError }] =
    userApi.useLazyValidateResetPasswordTokenQuery();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token === null) {
      return navigate(MAIN_ROUTE);
    }

    validateResetPasswordToken({ token });
  }, [searchParams]);

  if (validateError) {
    let errMessage = '';
    if (isErrorWithMessage(validateError)) {
      errMessage = validateError.message;
    } else if (isFetchBaseQueryError(validateError)) {
      errMessage = 'error' in validateError ? validateError.error : (validateError as FetchError).data.message;
    }

    return <ResetPasswordError error={errMessage} />;
  }

  if (validateResetPasswordTokenIsLoading) {
    return (
      <StyledAuthFormContainer $center>
        <FullPageSpinner $height={50} />
      </StyledAuthFormContainer>
    );
  }

  const token = searchParams.get('token') as string;

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match.');
    }

    await resetPasswordConfirm({ password, token })
      .unwrap()
      .then(() => {
        toast.success('Password was successfully changed.');
        navigate(SIGN_IN_ROUTE);
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

  return (
    <StyledAuthFormContainer $center>
      <StyledAuthForm onSubmit={handleSubmit(handlePasswordReset)}>
        <StyledAuthFormHeader as="h1" $size={28}>
          Enter new password
        </StyledAuthFormHeader>

        <StyledAuthFormLabel htmlFor="password" as="label" $size={14}>
          Password
          <StyledInput
            placeholder="Password"
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long'
              }
            })}
          />
          {errors.password && <Text $color="red">{errors.password.message}</Text>}
        </StyledAuthFormLabel>

        <StyledAuthFormLabel htmlFor="confirmPassword" as="label" $size={14}>
          Confirm Password
          <StyledInput
            placeholder="Confirm Password"
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Please confirm your password'
            })}
          />
          {errors.confirmPassword && <Text $color="red">{errors.confirmPassword.message}</Text>}
        </StyledAuthFormLabel>

        <StyledAuthFormButton $variant="primary" type="submit">
          Change password
          {isLoading && <Spinner $size={16} />}
        </StyledAuthFormButton>
      </StyledAuthForm>
    </StyledAuthFormContainer>
  );
}
