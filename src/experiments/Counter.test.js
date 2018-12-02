import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Counter from './Counter';

const repeat = (times, fn) => [...Array(times)].forEach(fn);

describe('initial count', () => {
  test('set to 10', () => {
    const { getByText } = render(<Counter />);

    expect(getByText('10'));
  });
});

describe('+5 button', () => {
  test('adds 5 to the count', () => {
    const { getByText } = render(<Counter />);

    fireEvent.click(getByText('+5'));

    expect(getByText('15'));
  });

  test('disabled if final count would exceed max', () => {
    const { getByText } = render(<Counter />);
    const addFiveButton = getByText('+5');

    repeat(4, () => fireEvent.click(addFiveButton));

    expect(addFiveButton).toBeDisabled();
  });
});

describe('-2 button', () => {
  test('subtracts 2 to the count', () => {
    const { getByText } = render(<Counter />);

    fireEvent.click(getByText('-2'));

    expect(getByText('8'));
  });

  test('disabled if final count would be below min', () => {
    const { getByText } = render(<Counter />);

    repeat(5, () => fireEvent.click(getByText('-2')));

    expect(getByText('-2')).toBeDisabled();
  });
});

describe('reset button', () => {
  test('sets count to initial value', () => {
    const { getByText } = render(<Counter />);

    fireEvent.click(getByText('+5'));
    fireEvent.click(getByText('Reset'));

    expect(getByText('10'));
  });

  test('disabled if count is at initial value', () => {
    const { getByText } = render(<Counter />);
    const addFiveButton = getByText('+5');
    const subtractTwoButton = getByText('-2');
    const resetButton = getByText('Reset');

    expect(resetButton).toBeDisabled();

    fireEvent.click(addFiveButton);
    repeat(4, () => fireEvent.click(subtractTwoButton));
    fireEvent.click(addFiveButton);
    fireEvent.click(subtractTwoButton);

    expect(resetButton).toBeDisabled();
  });
});

describe('clear button', () => {
  test('sets count to zero', () => {
    const { getByText } = render(<Counter />);

    fireEvent.click(getByText('+5'));
    fireEvent.click(getByText('Clear'));

    expect(getByText('0'));
  });

  test('disabled if count is at zero', () => {
    const { getByText } = render(<Counter />);

    expect(getByText('Clear')).not.toBeDisabled();

    repeat(5, () => fireEvent.click(getByText('-2')));

    expect(getByText('Clear')).toBeDisabled();
  });
});
