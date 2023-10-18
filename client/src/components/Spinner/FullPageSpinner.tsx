import styled from 'styled-components';
import { Flex } from '../Flex/Flex';
import Spinner from './Spinner';

interface StyledFullPageSpinnerProps {
  $height?: number;
}

const StyledFullPageSpinner = styled(Flex)<StyledFullPageSpinnerProps>`
  height: ${({ $height }) => `${$height}vh` || '100vh'};
`;

interface FullPageSpinnerProps {
  $height?: number;
}

export function FullPageSpinner({ $height }: FullPageSpinnerProps) {
  return (
    <StyledFullPageSpinner $center $height={$height}>
      <Spinner $size={100} />
    </StyledFullPageSpinner>
  );
}
