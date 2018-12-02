import styled from '@emotion/styled';
import { center } from '../styles';

const Section = styled.section`
  background-color: ${({ color }) => color};
  height: ${({ height }) => height};
  padding: 1rem;
  flex: 1 0 auto;
  ${center}

  & > * {
    ${center}
    flex-direction: column;
  }
`;

export default Section;
