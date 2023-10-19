import styled from 'styled-components';
import { Flex } from '../Flex/Flex';
import Spinner from './Spinner';

interface StyledFullPageSpinnerProps {
  $height?: number;
}

const StyledFullPageSpinner = styled(Flex)<StyledFullPageSpinnerProps>`
  height: ${({ $height }) => ($height ? `${$height}vh` : '100vh')};
`;

export function FullPageSpinner() {
  return (
    <StyledFullPageSpinner $center>
      <Spinner $size={100} />
    </StyledFullPageSpinner>
  );
}
