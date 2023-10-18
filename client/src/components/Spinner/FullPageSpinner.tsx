import styled from 'styled-components';
import { Flex } from '../Flex/Flex';
import Spinner from './Spinner';

const StyledFullPageSpinner = styled(Flex)`
  height: 100vh;
`;

export function FullPageSpinner() {
  return (
    <StyledFullPageSpinner $center>
      <Spinner $size={100} />
    </StyledFullPageSpinner>
  );
}
