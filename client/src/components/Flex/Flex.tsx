import styled, { css } from 'styled-components';

interface FlexProps {
  $center?: boolean;
  $spaceBetween?: boolean;
  $justifyEnd?: boolean;
  $gap?: string;
  $wrap?: boolean;
  children: React.ReactNode;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ $center }) =>
    $center &&
    css`
      justify-content: center;
      align-items: center;
    `}
  ${({ $spaceBetween }) =>
    $spaceBetween &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
    ${({ $justifyEnd }) =>
    $justifyEnd &&
    css`
      justify-content: flex-end;
      align-items: center;
    `}
    ${({ $gap }) =>
    $gap &&
    css`
      gap: ${$gap};
    `}
    ${({ $wrap }) =>
    $wrap &&
    css`
      flex-wrap: ${'wrap'};
    `}
`;
