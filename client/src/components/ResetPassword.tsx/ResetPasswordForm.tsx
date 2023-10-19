import { SIGN_IN_ROUTE } from '#/libs/constants/routes';
import { isErrorWithMessage } from '#/libs/helpers/isErrorWithMessage';
import { isFetchBaseQueryError } from '#/libs/helpers/isFetchBaseQueryError';
import { User } from '#/libs/types/User/User.type';
import { FetchError } from '#/store/api';
import { userApi } from '#/store/reducers/user/UserApi';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  StyledAuthForm,
  StyledAuthFormButton,
  StyledAuthFormContainer,
  StyledAuthFormHeader,
  StyledAuthFormLabel,
  StyledAuthFormLink
} from '../AuthForm/AuthForm';
import { Flex } from '../Flex/Flex';
import { StyledInput } from '../Input/Input';
import Spinner from '../Spinner/Spinner';
import { Text } from '../Text/Text';

type FormData = Pick<User, 'email'>;

export function ResetPasswordForm() {
  const [resetPassword, { isLoading }] = userApi.useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const handlePasswordReset = async (formData: FormData) => {
    await resetPassword(formData)
      .unwrap()
      .then(() => toast.success('Link to reset password was successfully sent.'))
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
          Reset password
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

        <StyledAuthFormButton $variant="primary" type="submit">
          Reset password
          {isLoading && <Spinner $size={16} />}
        </StyledAuthFormButton>

        <Flex $center>
          <span>
            <StyledAuthFormLink $size={14} $weight="bold">
              Have an account? <Link to={SIGN_IN_ROUTE}>Sign In</Link>
            </StyledAuthFormLink>
          </span>
        </Flex>
      </StyledAuthForm>
    </StyledAuthFormContainer>
  );
}
