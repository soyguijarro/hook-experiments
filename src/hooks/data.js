import { useState, useEffect } from 'react';

export const useList = (
  initialItems = [],
  { matcher, onUpdate = () => {} } = {}
) => {
  const [items, setItems] = useState(initialItems);
  useEffect(
    () => {
      onUpdate(items);
    },
    [items]
  );

  const find = idOrIndex =>
    matcher ? items.find(item => matcher(idOrIndex, item)) : items[idOrIndex];

  const findIndex = idOrIndex =>
    matcher ? items.findIndex(item => matcher(idOrIndex, item)) : idOrIndex;

  const addFirst = item => {
    setItems(items => [item, ...items.slice(0)]);
  };

  const addLast = item => {
    setItems(items => [...items, item]);
  };

  const insert = (item, index) => {
    setItems(items => [...items.slice(0, index), item, ...items.slice(index)]);
  };

  const edit = (idOrIndex, valueOrTransform) => {
    const index = findIndex(idOrIndex);
    if (index === undefined) return;

    const item = items[index];
    const isTransform = typeof valueOrTransform === 'function';
    const editedItem = isTransform ? valueOrTransform(item) : valueOrTransform;

    setItems(items => [
      ...items.slice(0, index),
      editedItem,
      ...items.slice(index + 1),
    ]);
  };

  const remove = idOrIndex => {
    setItems(items =>
      items.filter((item, index) =>
        matcher ? !matcher(idOrIndex, item) : index !== idOrIndex
      )
    );
  };

  const set = itemsOrUpdateFn => {
    const isUpdateFn = typeof itemsOrUpdateFn === 'function';
    setItems(isUpdateFn ? itemsOrUpdateFn(items) : itemsOrUpdateFn);
  };

  const reset = () => {
    setItems(initialItems);
  };

  const clear = () => {
    setItems([]);
  };

  return [
    items,
    { find, addFirst, addLast, insert, edit, remove },
    { set, reset, clear },
  ];
};

export const useCount = (
  initialCount = 0,
  { min = 0, max = Infinity, step = 1, onUpdate = () => {} } = {}
) => {
  const [count, setCount] = useState(initialCount);
  useEffect(
    () => {
      onUpdate(count);
    },
    [count]
  );

  const canAdd = (stepOverride = step) => count + stepOverride <= max;

  const canSubtract = (stepOverride = step) => count - stepOverride >= min;

  const add = (stepOverride = step) => {
    setCount(count => (canAdd(stepOverride) ? count + stepOverride : count));
  };

  const subtract = (stepOverride = step) => {
    setCount(count =>
      canSubtract(stepOverride) ? count - stepOverride : count
    );
  };

  const reset = () => {
    setCount(initialCount);
  };

  const clear = () => {
    setCount(0);
  };

  return [
    count,
    {
      add,
      subtract,
      reset: count !== initialCount ? reset : undefined,
      clear: count !== 0 ? clear : undefined,
    },
    { canAdd, canSubtract },
  ];
};

export const useBoolean = (
  initialValue = false,
  { onUpdate = () => {} } = {}
) => {
  const [value, setValue] = useState(initialValue);
  useEffect(
    () => {
      onUpdate(value);
    },
    [value]
  );

  const set = value => {
    setValue(value);
  };

  const toggle = () => {
    setValue(value => !value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return [
    value,
    { set, toggle, reset: value !== initialValue ? reset : undefined },
  ];
};
