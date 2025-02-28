"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ChangeEvent,
  JSX,
} from "react";
import useFormState from "../hooks/useFormState";
import useLocaStorageState from "../hooks/useLocaStorageState";

// Define types for form data
type FormData = {
  name: string;
  email: string;
  password: string;
};

// Define the context type
type FormContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

// Create context with proper type and default value
const FormContext = createContext<FormContextType>({
  formData: { name: "", email: "", password: "" },
  setFormData: () => {},
});

const DemoFormComponent: React.FC = () => {
  const { values, handleChange } = useFormState({
    name: "",
    email: "",
  });
  return (
    <>
      <form className="flex flex-col gap-3" action="">
        <input
          type="text"
          name={"name"}
          value={values.name}
          onChange={(e) => {
            handleChange("name", e.target.value);
          }}
          className="border text-black"
        />
        <input
          type="text"
          name="email"
          value={values.email}
          className="border text-black"
          onChange={(e) => {
            handleChange("email", e.target.value);
          }}
        />
      </form>
    </>
  );
};

export default function Home(): JSX.Element {
  return (
    <FormProvider>
      <div>
        <Input name="email" type="email" placeholder="Email" />
      </div>
      <div className="flex gap-2 flex-col">
        <Input name="name" type="text" placeholder="Name" />
        <Input name="password" type="password" placeholder="Password" />
      </div>
    </FormProvider>
    // <DemoFormComponent />
  );
}

// Define props for FormProvider
type FormProviderProps = {
  children: ReactNode;
};

function FormProvider({ children }: FormProviderProps): JSX.Element {
  const [formData, setFormData] = useLocaStorageState<FormData>("details", {
    name: "",
    email: "",
    password: "",
  }) as [FormData, React.Dispatch<React.SetStateAction<FormData>>];

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      <form>{children}</form>
    </FormContext.Provider>
  );
}

// Define props for Input component
type InputProps = {
  name: keyof FormData;
  type: string;
  placeholder: string;
};

function Input({ name, type, placeholder }: InputProps): JSX.Element {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("Input must be used within a FormProvider");
  }

  const { formData, setFormData } = context;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={formData[name]}
      onChange={handleChange}
      className="border border-gray-300 text-black rounded-md p-2 focus:outline-green-500"
    />
  );
}
