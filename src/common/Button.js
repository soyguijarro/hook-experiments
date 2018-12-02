import styled from '@emotion/styled';
import { COLORS } from '../styles';

const Button = styled.button`
  font-size: ${({ big }) => big && '1.2rem'};
  color: ${({ inverted }) => (inverted ? COLORS.BLACK : COLORS.WHITE)};
  background-color: ${({ inverted }) =>
    inverted ? COLORS.WHITE : COLORS.BLACK};
  border: none;
  border-radius: 1rem;
  padding: ${({ small }) => `0.5rem ${small ? 0 : '1rem'}`};
  margin: ${({ small }) => (small ? '0.75rem 0.25rem' : '1rem 0.4rem')};
  min-width: ${({ small }) => !small && '5.5rem'};
  width: ${({ small }) => small && '2.5rem'};
  opacity: ${({ disabled }) => (disabled ? 0.75 : 1)};
  transition: all 0.1s ease-in-out;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

export default Button;
