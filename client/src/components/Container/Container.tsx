import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 88%;
  max-width: 100%;
  margin: 0 auto;
`;

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <StyledContainer>{children}</StyledContainer>;
}
