import { useEffect, useState } from "react";

export const useDebounce = (value, timeout) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => setDebounceValue(value), timeout);

    return () => clearTimeout(timerId);
  }, [value, timeout]);

  return debounceValue;
};
