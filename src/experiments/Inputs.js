import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import Section from '../common/Section';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import {
  useTextInput,
  useCheckbox,
  useRadioGroup,
  useSelect,
  useMultipleSelect,
} from '../hooks/input';

const RoundedSelect = props => {
  const StyledSelect = styled(Select)`
    border-radius: 1rem;
  `;
  return <StyledSelect {...props} small inverted width="12.5rem" />;
};

const MultipleSelect = () => {
  const [selected, props, { set, reset }] = useMultipleSelect(['vue']);

  return (
    <div>
      <RoundedSelect {...props} multiple size="2">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
      </RoundedSelect>
      <div>
        <Button
          onClick={() => set(['react'])}
          disabled={selected.length === 1 && selected[0] === 'react'}
        >
          Set React
        </Button>
        <Button onClick={reset} disabled={!reset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

const SingleSelect = () => {
  const [selected, props, { set, reset }] = useSelect('vue');

  return (
    <div>
      <RoundedSelect {...props}>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
      </RoundedSelect>
      <div>
        <Button onClick={() => set('react')} disabled={selected === 'react'}>
          Set React
        </Button>
        <Button onClick={reset} disabled={!reset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

const Label = styled.label`
  margin: 0 0.5rem;
`;

const RadioInput = styled.input`
  margin-right: 0.5rem;
`;

const RadioGroup = () => {
  const [selected, props, { set, reset }] = useRadioGroup('frameworks', 'vue');

  return (
    <div>
      <div>
        <Label>
          <RadioInput {...props('react')} />
          React
        </Label>
        <Label>
          <RadioInput {...props('vue')} />
          Vue
        </Label>
        <Label>
          <RadioInput {...props('angular')} />
          Angular
        </Label>
      </div>
      <div>
        <Button onClick={() => set('react')} disabled={selected === 'react'}>
          Set React
        </Button>
        <Button onClick={reset} disabled={!reset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

const Checkboxes = () => {
  const [checked, props, { set, reset }] = useCheckbox('react');

  return (
    <div>
      <div>
        <input {...props} />
        <Label htmlFor="react">Use React</Label>
      </div>
      <div>
        <Button onClick={() => set(true)} disabled={checked}>
          Check
        </Button>
        <Button onClick={reset} disabled={!reset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

const CenteredInput = styled(Input)`
  text-align: center;
`;

const TextInput = () => {
  const [value, props, { set, reset, clear }] = useTextInput('Vue');

  return (
    <div>
      <CenteredInput {...props} placeholder="Enter framework" width="12.5rem" />
      <div>
        <Button onClick={() => set('React')} disabled={value === 'React'}>
          Set React
        </Button>
        <Button onClick={reset} disabled={!reset}>
          Reset
        </Button>
        <Button onClick={clear} disabled={!clear}>
          Clear
        </Button>
      </div>
    </div>
  );
};

const TightSection = styled(Section)`
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: -1rem;
`;

const Inputs = () => {
  return (
    <Fragment>
      <TightSection color="lightblue" height="20%">
        <TextInput />
      </TightSection>
      <TightSection color="lightslategrey" height="20%">
        <Checkboxes />
      </TightSection>
      <TightSection color="lightsteelblue" height="20%">
        <RadioGroup />
      </TightSection>
      <TightSection color="powderblue" height="20%">
        <SingleSelect />
      </TightSection>
      <TightSection color="lightblue" height="20%">
        <MultipleSelect />
      </TightSection>
    </Fragment>
  );
};

export default Inputs;
