import { theme } from '#/themes/themes';
import styled, { css } from 'styled-components';

type TextWeight = 'regular' | 'bold';

const fontWeight: Record<TextWeight, number> = {
  regular: 400,
  bold: 700
};

export type TextColor = keyof typeof theme.colors;

export interface TextProps {
  $color?: TextColor;
  $weight?: TextWeight;
  $size?: number;
  $centered?: boolean;
  $cropped?: boolean;
  $nowrap?: boolean;
}

export const Text = styled.p<TextProps>`
  margin: 0;
  padding: 0;
  overflow-wrap: break-word;

  ${({ $color: color, theme }) =>
    color &&
    css`
      color: ${theme.colors[color]};
    `}
  ${({ $weight: weight }) =>
    weight &&
    css`
      font-weight: ${fontWeight[weight]};
    `}
  ${({ $size: size }) =>
    size &&
    css`
      font-size: ${`${size}px`};
    `}
  ${({ $centered: centered }) =>
    centered &&
    css`
      text-align: center;
    `}

  ${({ $nowrap: nowrap }) =>
    nowrap &&
    css`
      white-space: nowrap;
    `}

  ${({ $cropped: cropped }) =>
    cropped &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;
