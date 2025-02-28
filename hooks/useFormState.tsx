import React, { useState } from "react";

export default function useFormState<T>(initialValue: T) {
  const [values, setValues] = useState(initialValue);

  function handleChange(key: keyof T, value: string | number) {
    setValues((prev) => {
      return { ...prev, [key]: value };
    });
  }

  return {
    values,
    handleChange,
  };
}
