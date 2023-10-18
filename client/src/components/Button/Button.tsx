import styled, { css } from 'styled-components';

type ButtonVariants = 'primary' | 'outline';

interface StyledButtonProps {
  $variant: ButtonVariants;
  $color?: string;
}

export const StyledButton = styled.button<StyledButtonProps>`
  padding: 9px 55px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;

  ${({ $variant, $color }) => {
    switch ($variant) {
      case 'outline':
        return css`
          background: transparent;
          border: 1px solid ${({ theme }) => $color || theme.colors.secondary};
          color: ${({ theme }) => $color || theme.colors.secondary};

          & a {
            text-decoration: none;
            color: ${({ theme }) => $color || theme.colors.secondary};
          }
        `;
      case 'primary':
      default:
        return css`
          background-color: ${({ theme }) => $color || theme.colors.secondary};
          color: #fff;

          & a {
            text-decoration: none;
            color: #fff;
          }
        `;
    }
  }}

  &:hover {
    opacity: 0.8;
    transition: 150ms;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, StyledButtonProps {}

export function Button({ children, ...rest }: ButtonProps) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
