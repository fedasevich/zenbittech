import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface SpinnerProps {
  $size?: number;
}

const Spinner = styled.div<SpinnerProps>`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: ${({ $size }) => `${$size || 24}px`};
  height: ${({ $size }) => `${$size || 24}px`};
  border-radius: 50%;
`;

export default Spinner;
