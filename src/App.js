import React, { Fragment, useState } from 'react';
import StyledSelect from './common/Select';
import styled from '@emotion/styled';
import { EXPERIMENTS } from './config';

const useSelect = options => {
  const [value, setValue] = useState(options[0].value);

  const onChange = ({ target: { value } }) => {
    setValue(value);
  };

  const Select = ({ children, ...rest }) => (
    <StyledSelect value={value} onChange={onChange} {...rest} width="100%">
      {options.map(({ value, text, ...rest }) => (
        <option key={value} value={value} {...rest}>
          {text}
        </option>
      ))}
    </StyledSelect>
  );

  return [value, Select];
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  height: 100%;
`;

const Header = styled.header`
  flex: 0 0 auto;
`;

const App = () => {
  const [value, Select] = useSelect(
    EXPERIMENTS.map(({ component, isDefault, ...rest }) => rest)
  );
  const Experiment = EXPERIMENTS.find(option => option.value === value)
    .component;

  return (
    <Fragment>
      <Header>
        <Select />
      </Header>
      <Main>
        <Experiment />
      </Main>
    </Fragment>
  );
};

export default App;
