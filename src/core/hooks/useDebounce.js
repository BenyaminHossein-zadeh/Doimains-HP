import React from "react";

export const useDebounce = (callback, delay) => {
  const callbackRef = React.useRef(callback);

  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  let timer;

  const naiveDebounce = (func, delayMs, ...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delayMs);
  };

  return React.useMemo(
    () =>
      (...args) =>
        naiveDebounce(callbackRef.current, delay, ...args),
    [delay]
  );
};
