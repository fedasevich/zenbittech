import { SIGN_IN_ROUTE } from '#/libs/constants/routes';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  StyledAuthForm,
  StyledAuthFormButton,
  StyledAuthFormContainer,
  StyledAuthFormHeader
} from '../AuthForm/AuthForm';
import { Text } from '../Text/Text';

interface ResetPasswordErrorProps {
  error: string;
}

const StyledError = styled(Text)`
  font-family: 'Lato';
`;

export function ResetPasswordError({ error }: ResetPasswordErrorProps) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(SIGN_IN_ROUTE);
  };

  return (
    <StyledAuthFormContainer $center>
      <StyledAuthForm>
        <StyledAuthFormHeader as="h1" $size={28}>
          Reset password
        </StyledAuthFormHeader>
        <StyledError $color="red" as="h2">
          {error}
        </StyledError>
        <StyledAuthFormButton $variant="primary" type="submit" onClick={handleButtonClick}>
          Return to Sign In
        </StyledAuthFormButton>
      </StyledAuthForm>
    </StyledAuthFormContainer>
  );
}
