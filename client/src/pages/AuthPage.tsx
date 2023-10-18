import { AuthForm } from '#/components/AuthForm/AuthForm';
import { StyledAuthFormImage } from '#/components/AuthForm/AuthFormImage';
import { Flex } from '#/components/Flex/Flex';
import styled from 'styled-components';

const StyledAuthPage = styled(Flex)`
  height: calc(100vh - 80px);
  width: 100%;
`;

export function AuthPage() {
  return (
    <StyledAuthPage>
      <StyledAuthFormImage />
      <AuthForm />
    </StyledAuthPage>
  );
}
