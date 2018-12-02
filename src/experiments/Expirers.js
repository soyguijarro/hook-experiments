import React, { Fragment } from 'react';
import Section from '../common/Section';
import BigText from '../common/BigText';
import Button from '../common/Button';
import { useCount } from '../hooks/data';
import { useExpirer } from '../hooks/time';

const TotalCount = ({ count }) => (count ? `${count} in total` : 'No timeouts');

const Count = ({ count }) => (
  <p>
    {count ? `${count} ${count > 1 ? 'timeouts' : 'timeout'}` : 'No timeouts'}
  </p>
);

const Toggle = ({ isRunning, toggle, seconds }) => (
  <Button onClick={toggle}>
    {isRunning ? 'Cancel' : 'Start'} {seconds} secs
  </Button>
);

const Status = ({ isRunning }) => <BigText>{isRunning ? '⏲️' : '⏹️'}</BigText>;

const Expirer = ({ timeout, isRunning, count, toggle }) => (
  <div>
    <Status isRunning={isRunning} />
    <Toggle isRunning={isRunning} toggle={toggle} seconds={timeout / 1000} />
    <Count count={count} />
  </div>
);

const useExpirerComponent = timeout => {
  const [count, { add: addToCount }] = useCount();
  const [isRunning, { toggle }] = useExpirer(addToCount, timeout);

  return [
    count,
    () => (
      <Expirer
        timeout={timeout}
        isRunning={isRunning}
        count={count}
        toggle={toggle}
      />
    ),
  ];
};

const Expirers = () => {
  const [countOne, ExpirerOne] = useExpirerComponent(1000);
  const [countTwo, ExpirerTwo] = useExpirerComponent(3000);
  const totalCount = countOne + countTwo;

  return (
    <Fragment>
      <Section color="mediumturquoise" height="45%">
        <ExpirerOne />
      </Section>
      <Section color="cadetblue" height="10%">
        <TotalCount count={totalCount} />
      </Section>
      <Section color="aquamarine" height="45%">
        <ExpirerTwo />
      </Section>
    </Fragment>
  );
};

export default Expirers;
