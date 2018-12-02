import React, { Fragment } from 'react';
import Section from '../common/Section';
import BigText from '../common/BigText';
import Button from '../common/Button';
import Center from '../common/Center';
import styled from '@emotion/styled';
import { useCount } from '../hooks/data';

const FixedWidthBigText = styled(BigText)`
  width: 7rem;
`;

const Count = ({ count, addFive, subtractTwo }) => (
  <Center>
    <Button onClick={addFive} disabled={!addFive} small>
      +5
    </Button>
    <FixedWidthBigText>{count}</FixedWidthBigText>
    <Button onClick={subtractTwo} disabled={!subtractTwo} small>
      -2
    </Button>
  </Center>
);

const Actions = ({ reset, clear }) => (
  <Center>
    <Button onClick={reset} disabled={!reset}>
      Reset
    </Button>
    <Button onClick={clear} disabled={!clear}>
      Clear
    </Button>
  </Center>
);

const Counter = () => {
  const [
    count,
    { add, subtract, reset, clear },
    { canAdd, canSubtract },
  ] = useCount(10, { max: 30 });

  const addFive = canAdd(5) ? () => add(5) : undefined;
  const subtractTwo = canSubtract(2) ? () => subtract(2) : undefined;

  return (
    <Fragment>
      <Section color="yellowgreen">
        <div>
          <Count count={count} addFive={addFive} subtractTwo={subtractTwo} />
          <Actions reset={reset} clear={clear} />
        </div>
      </Section>
    </Fragment>
  );
};

export default Counter;
