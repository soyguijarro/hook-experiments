import { useRef, useEffect, useState } from 'react';
import { useCount } from './data';

const TIME_METHODS = {
  interval: [window.setInterval, window.clearInterval],
  timeout: [window.setTimeout, window.clearTimeout],
};

const useTimeMethod = (type, fn, ms, { autoStart } = {}) => {
  const [setMethod, clearMethod] = TIME_METHODS[type];

  const id = useRef();

  const set = () => {
    clear();
    id.current = setMethod(fn, ms);
  };

  const clear = () => {
    clearMethod(id.current);
  };

  useEffect(() => {
    if (autoStart) {
      set();
    }
    return clear;
  }, []);

  return { set, clear };
};

export const useTimeout = (...args) => useTimeMethod('timeout', ...args);

export const useInterval = (...args) => useTimeMethod('interval', ...args);

export const useExpirer = (onExpire, ms, { autoStart } = {}) => {
  const { set, clear } = useTimeout(
    () => {
      cancel();
      onExpire();
    },
    ms,
    { autoStart }
  );
  const [isRunning, setRunning] = useState(autoStart);

  const run = () => {
    setRunning(true);
    set();
  };

  const cancel = () => {
    setRunning(false);
    clear();
  };

  const toggle = () => {
    if (isRunning) {
      cancel();
    } else {
      run();
    }
  };

  return [
    isRunning,
    {
      run: !isRunning ? run : undefined,
      cancel: isRunning ? cancel : undefined,
      toggle,
    },
  ];
};

export const useTimer = (
  initialTime = 0,
  { autoStart, onUpdate = () => {} } = {}
) => {
  const [
    time,
    { add: updateTime, reset: resetTime, clear: clearTime },
  ] = useCount(initialTime, {
    step: 0.1,
    onUpdate,
  });
  const { set: startInterval, clear: stopInterval } = useInterval(
    updateTime,
    100,
    { autoStart }
  );
  const [isRunning, setRunning] = useState(autoStart);

  const start = () => {
    setRunning(true);
    startInterval();
  };

  const stop = () => {
    setRunning(false);
    stopInterval();
  };

  const toggle = () => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  };

  const reset = () => {
    stop();
    resetTime();
  };

  const clear = () => {
    stop();
    clearTime();
  };

  return [
    { time, isRunning },
    {
      start,
      stop,
      toggle,
      reset: resetTime ? reset : undefined,
      clear: clearTime ? clear : undefined,
    },
  ];
};
