"use client";
import React, { useState, useRef, useEffect, use } from "react";

export default function MultiStepForm() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  function handleSubmit(inputs) {
    console.log(inputs);
  }
  let steps = [
    {
      id: 1,
      component: <Form details={details} setDetails={setDetails} />,
    },
    {
      id: 2,
      component: <OTPForm inputNumber={4} handleSubmit={handleSubmit} />,
    },
    {
      id: 3,
      component: <DetailsDisplay details={details} />,
    },
  ];
  return (
    <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
      {steps[currentStep].component}
      <div className="flex gap-4">
        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentStep === steps.length - 1}
          onClick={() => setCurrentStep(currentStep + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Form({ details, setDetails }) {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Name"
        value={details.name}
        className="border border-gray-300 rounded-md p-2 text-black"
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={details.email}
        className="border border-gray-300 rounded-md p-2 text-black"
        onChange={(e) => setDetails({ ...details, email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={details.phone}
        className="border border-gray-300 rounded-md p-2 text-black"
        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
      />
    </div>
  );
}

function OTPForm({ inputNumber = 4, handleSubmit }) {
  const [inputs, setInputs] = useState(
    new Array(parseInt(inputNumber)).fill(null)
  );
  const inputRefs = useRef([]);
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);
  return (
    <div className="flex  gap-4">
      {inputs.map((input, index) => (
        <input
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-10 h-10 border text-black border-gray-300 rounded-md text-center"
          key={index}
          type="number"
          value={input || ""}
          onChange={(e) => {
            setInputs((prev) => {
              const newInputs = [...prev];
              newInputs[index] = e.target.value;
              return newInputs;
            });
            if (e.target.value && index < inputNumber - 1) {
              inputRefs.current[index + 1].focus();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              if (!inputs[index]) {
                inputRefs.current[index - 1].focus();
              }
            }
          }}
        />
      ))}
      <button
        onClick={() => {
          handleSubmit(inputs);
        }}
      >
        Submit
      </button>
    </div>
  );
}

function DetailsDisplay({ details }) {
  return (
    <div className="flex flex-col gap-4">
      <p>Name: {details.name}</p>
      <p>Email: {details.email}</p>
      <p>Phone: {details.phone}</p>
    </div>
  );
}
