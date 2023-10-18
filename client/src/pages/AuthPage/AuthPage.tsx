import { AuthForm } from '#/components/AuthForm/AuthForm';
import { StyledAuthFormImage } from '#/components/AuthForm/AuthFormImage';
import { Flex } from '#/components/Flex/Flex';
import styled from 'styled-components';

export const StyledAuthPage = styled(Flex)`
  height: calc(100vh - 60px);
  width: 100%;

  @media ${({ theme }) => theme.media.lg} {
    height: calc(100vh - 80px);
  }
`;

interface AuthPageProps {
  children?: React.ReactNode;
}

export function AuthPage({ children }: AuthPageProps) {
  return (
    <StyledAuthPage>
      <StyledAuthFormImage />
      {children || <AuthForm />}
    </StyledAuthPage>
  );
}
