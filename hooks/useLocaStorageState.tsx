import React, { use } from "react";
import { useEffect, useState, useRef } from "react";
export default function useLocaStorageState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    return JSON.parse(localStorage.getItem(key) || "") || defaultValue;
  });
  const prevValueRef = useRef<string>(null);

  useEffect(() => {
    if (prevValueRef.current !== key) {
      localStorage.removeItem(prevValueRef.current || "");
    }
    prevValueRef.current = key;
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
