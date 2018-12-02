import styled from '@emotion/styled';
import { COLORS } from '../styles';

const Input = styled.input`
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.GREY};
  padding: 0.4rem 0.5rem;
  border-radius: 1rem;
  transition: border-color 0.1s ease-in-out;
  margin-right: 0.2rem;
  width: ${({ width }) => width || 'auto'};

  &:focus {
    border-color: ${COLORS.BLACK};
    outline: none;
  }
`;

export default Input;
