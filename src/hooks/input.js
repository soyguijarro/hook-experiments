import { useState, useRef, useEffect } from 'react';
import { useBoolean } from './data';

export const useMultipleSelect = (
  initialValues = [],
  { onUpdate = () => {} } = {}
) => {
  const [selectedValues, set] = useState(initialValues);
  useEffect(
    () => {
      onUpdate(selectedValues);
    },
    [selectedValues]
  );

  const onChange = ({ target: { selectedOptions } }) => {
    set([...selectedOptions].map(({ value }) => value));
  };

  const reset = () => {
    set(initialValues);
  };

  return [
    selectedValues,
    { value: selectedValues, onChange },
    {
      set: set,
      reset:
        JSON.stringify(selectedValues) !== JSON.stringify(initialValues)
          ? reset
          : undefined,
    },
  ];
};

export const useSelect = (initialValue, { onUpdate = () => {} } = {}) => {
  const [selectedValue, set] = useState(initialValue);
  useEffect(
    () => {
      onUpdate(selectedValue);
    },
    [selectedValue]
  );

  const onChange = ({ target: { value } }) => {
    set(value);
  };

  const reset = () => {
    set(initialValue);
  };

  return [
    selectedValue,
    { value: selectedValue, onChange },
    {
      set: set,
      reset: selectedValue !== initialValue ? reset : undefined,
    },
  ];
};

export const useRadioGroup = (
  name,
  initialValue,
  { onUpdate = () => {} } = {}
) => {
  const [checkedValue, set] = useState(initialValue);
  useEffect(
    () => {
      onUpdate(checkedValue);
    },
    [checkedValue]
  );

  const onChange = ({ target: { value } }) => {
    set(value);
  };

  const reset = () => {
    set(initialValue);
  };

  return [
    checkedValue,
    value => ({
      name,
      value: value,
      type: 'radio',
      onChange,
      checked: value === checkedValue,
    }),
    {
      set: set,
      reset: checkedValue !== initialValue ? reset : undefined,
    },
  ];
};

export const useCheckbox = (
  name,
  initialChecked = false,
  { onUpdate = () => {} } = {}
) => {
  const [checked, { set, toggle, reset }] = useBoolean(initialChecked);
  useEffect(
    () => {
      onUpdate(checked);
    },
    [checked]
  );

  const onChange = ({ target: { checked } }) => {
    set(checked);
  };

  return [
    checked,
    { name, type: 'checkbox', onChange, checked },
    {
      set,
      toggle,
      reset: checked !== initialChecked ? reset : undefined,
    },
  ];
};

const useFocus = () => {
  const ref = useRef(null);
  const setFocus = () => {
    ref.current.focus();
  };

  return [ref, setFocus];
};

export const useTextInput = (
  initialValue = '',
  { onUpdate = () => {} } = {}
) => {
  const [value, setValue] = useState(initialValue);
  const [inputRef, setFocus] = useFocus(null);
  useEffect(
    () => {
      onUpdate(value);
    },
    [value]
  );

  const onChange = ({ target: { value } }) => {
    setValue(value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  const clear = () => {
    setValue('');
  };

  return [
    value,
    { type: 'text', onChange, value, ref: inputRef },
    {
      set: setValue,
      reset: value !== initialValue ? reset : undefined,
      clear: value !== '' ? clear : undefined,
      focus: setFocus,
    },
  ];
};
