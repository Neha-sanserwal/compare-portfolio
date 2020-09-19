import React, { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
}
