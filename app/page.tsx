"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ChangeEvent,
  JSX,
  Children,
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
  });

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

// let filesData = [
//   {
//     name: "dinesh",
//     id: "1",
//     isFolder: true,
//     children: [
//       {
//         name: "reddy",
//         id: "2",
//         isFolder: true,
//         children: [{ name: "reddyere", id: "3", isFolder: false }],
//       },
//     ],
//   },
//   {
//     name: "dinesh2",
//     id: "4",
//     isFolder: false,
//   },
//   {
//     name: "dinesh3",
//     id: "5",
//     isFolder: true,
//     children: [
//       {
//         name: "reddy4",
//         id: "6",
//         isFolder: true,
//         children: [{ name: "reddynani", id: "7", isFolder: false }],
//       },
//     ],
//   },
// ];

// function List({
//   value,
//   addFolder,
// }: {
//   value: { name: string; id: string; children?: any; isFolder: boolean };
//   addFolder: (id: string) => void;
// }) {
//   const [isOpen, setIsOpen] = useState({ dinesh: true });
//   return (
//     <>
//       <div className="flex gap-2">
//         <span>{value.isFolder ? "folder" : "file"}</span>
//         <div
//           onClick={() => {
//             if (value.isFolder) {
//               let cloneState = { ...isOpen };
//               cloneState[value.name] = !cloneState[value.name];
//               console.log(cloneState, "clone");
//               setIsOpen(cloneState);
//             }
//           }}
//         >
//           {value.name}
//         </div>
//         <span
//           onClick={() => {
//             addFolder(value.id);
//           }}
//         >
//           {!isOpen[value.name] ? "+" : "-"}
//         </span>
//       </div>
//       <div className="pl-3">
//         {isOpen[value.name]
//           ? value.children.length > 0 &&
//             value.children.map((val: any) => {
//               return <List key={val.id} value={val} addFolder={addFolder} />;
//             })
//           : ""}
//       </div>
//     </>
//   );
// }

// function FileComponent(): JSX.Element {
//   function addFolder(id: string) {
//     function updateList(list) {
//       return list.map((data: any) => {
//         if (data.id === id) {
//           return {
//             ...data,
//             children: [
//               ...data.children,
//               { name: "newFolder", id: "53535", isFolder: true, children: [] },
//             ],
//           };
//         }
//         if (data.isFolder && data.children) {
//           return {
//             ...data,
//             children: updateList(data.children), // Recursively update children
//           };
//         }
//         return data;
//       });
//     }
//     let newList = updateList(filesData);
//     console.log(newList);
//   }

//   function delteFolder(id: string) {
//     function updateList(list) {
//       console.log(list, id);
//       return list
//         .filter((li) => {
//           return li.id !== id;
//         })
//         .map((val) => {
//           if (val.isFolder) {
//             return {
//               ...val,
//               children: updateList(val.children),
//             };
//           }
//           return val;
//         });
//     }
//     let updatedListData = updateList(filesData);
//     console.log(updatedListData);
//   }
//   return (
//     <>
//       <div>
//         {filesData.map((value) => {
//           return <List key={value.id} value={value} addFolder={addFolder} />;
//         })}
//       </div>
//     </>
//   );
// }
