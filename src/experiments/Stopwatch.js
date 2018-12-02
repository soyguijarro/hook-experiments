import React from 'react';
import Section from '../common/Section';
import BigText from '../common/BigText';
import Button from '../common/Button';
import { useTimer } from '../hooks/time';

const Stopwatch = () => {
  const [{ time, isRunning }, { toggle, clear }] = useTimer();

  return (
    <Section color="coral">
      <div>
        <BigText>{time.toFixed(1)}</BigText>
        <div>
          <Button onClick={toggle}>{isRunning ? 'Stop' : 'Start'}</Button>
          <Button onClick={clear} disabled={!clear}>
            Clear
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Stopwatch;
