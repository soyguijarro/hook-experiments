import styled from '@emotion/styled';
import { COLORS } from '../styles';

const Select = styled.select`
  width: ${({ width }) => width || 'auto'};
  color: ${({ inverted }) => (inverted ? COLORS.BLACK : COLORS.WHITE)};
  background-color: ${({ inverted }) =>
    inverted ? COLORS.WHITE : COLORS.BLACK};
  border: none;
  padding: ${({ small }) => (small ? '0.5rem' : '1rem 0.5rem')};
  text-align: center;
  text-align-last: center;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  & > option {
    color: ${COLORS.BLACK};
    background-color: ${COLORS.WHITE};
  }
`;

export default Select;
