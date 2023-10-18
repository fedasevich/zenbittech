import styled from 'styled-components';

export const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.colors.grey};
  border-radius: 5px;
  border: 0;
  margin-top: 3px;
  margin-bottom: 3px;
  padding: 12px 20px;
  color: ${({ theme }) => theme.colors.primary};
`;
