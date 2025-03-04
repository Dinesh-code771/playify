"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";

export default function MultiStepForm() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [detailsError, setDetailsError] = useState({
    nameError: "",
    emailError: "",
    phoneError: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [otp, setOtp] = useState([]);
  const [otpError, setOtpError] = useState("");
  // const [isValidate, setIsValidate] = useState(false);
  function handleSubmit(inputs, e = null) {
    if (!isValidate()) {
      return;
    }
    if (e) {
      e.currentTarget.blur();
      // setCurrentStep(currentStep + 1);
    }
    setCurrentStep(currentStep + 1);
  }

  function isValidate() {
    if (currentStep === 1) {
      console.log(otp);
      if (otp.join("").length === 4) {
        setOtpError("");
        return true;
      } else {
        console.log(otp);
        setOtpError("please write the otp");
        return false;
      }
    }
    if (details.name.length && details.email.length && details.phone.length) {
      // setIsValidate(true);
      setDetailsError({
        nameError: "",
        emailError: "",
        phoneError: "",
      });
    } else if (!details.name.length) {
      // setIsValidate(false);
      setDetailsError({
        nameError: "please write the name",
      });
    } else if (!details.email.length) {
      // setIsValidate(false);
      setDetailsError({
        emailError: "please write the email",
      });
    } else if (!details.phone.length) {
      // setIsValidate(false);
      setDetailsError({
        phoneError: "please write the phone",
      });
    }
    if (details.name.length && details.email.length && details.phone.length) {
      return true;
    }
    return false;
  }

  function next() {
    if (!isValidate()) {
      return;
    }
    setCurrentStep(currentStep + 1);
  }
  let steps = useMemo(
    () => [
      {
        id: 1,
        component: (
          <Form
            details={details}
            setDetails={setDetails}
            detailsError={detailsError}
          />
        ),
      },
      {
        id: 2,
        component: (
          <OTPForm
            inputNumber={4}
            handleSubmit={handleSubmit}
            setOtp={setOtp}
            otpError={otpError}
          />
        ),
      },
      {
        id: 3,
        component: <DetailsDisplay details={details} />,
      },
    ],
    [details, otpError, detailsError, otp]
  );
  return (
    <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
      {steps[currentStep].component}
      <div className="flex gap-4">
        <button
          disabled={currentStep === 0}
          onClick={() => {
            if (currentStep === 2) {
              setCurrentStep(currentStep - 2);
            } else {
              setCurrentStep(currentStep - 1);
            }
          }}
        >
          Previous
        </button>
        <button
          disabled={currentStep === steps.length - 1}
          onClick={next}
          className={`bg-blue-500 text-white p-2 rounded-md ${
            currentStep === steps.length - 1 ? "opacity-50" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Form({ details, setDetails, detailsError }) {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Name"
        value={details.name}
        className="border border-gray-300 rounded-md p-2 text-black"
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
      />
      {detailsError.nameError && (
        <p className="text-red-500">{detailsError.nameError}</p>
      )}
      <input
        type="email"
        placeholder="Email"
        value={details.email}
        className="border border-gray-300 rounded-md p-2 text-black"
        onChange={(e) => setDetails({ ...details, email: e.target.value })}
      />
      {detailsError.emailError && (
        <p className="text-red-500">{detailsError.emailError}</p>
      )}
      <input
        type="tel"
        placeholder="Phone"
        value={details.phone}
        className="border border-gray-300 rounded-md p-2 text-black"
        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
      />
      {detailsError.phoneError && (
        <p className="text-red-500">{detailsError.phoneError}</p>
      )}
    </div>
  );
}

function OTPForm({ inputNumber = 4, handleSubmit, setOtp, otpError }) {
  console.log("rendieing");
  const [inputs, setInputs] = useState(
    new Array(parseInt(inputNumber)).fill(null)
  );
  const inputRefs = useRef([]);
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  useEffect(() => {
    setOtp(inputs);
  }, [inputs]);
  return (
    <div className="flex  gap-4">
      {inputs.map((input, index) => (
        <input
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-10 h-10 border text-black border-gray-300 rounded-md text-center"
          key={index}
          type="number"
          min={0}
          max={9}
          value={input || ""}
          onChange={(e) => {
            if (inputs[index]) {
              console.log("input already filled");
              return;
            }
            setInputs((prev) => {
              const newInputs = [...prev];
              newInputs[index] = e.target.value;
              return newInputs;
            });
            // if (e.target.value && index === inputNumber - 1) {
            //   handleSubmit(inputs, e);
            // }
            if (e.target.value && index < inputNumber - 1) {
              inputRefs.current[index + 1].focus();
            }
          }}
          onKeyDown={(e) => {
            console.log("e.key", e.key);
            if (e.key === "Backspace") {
              if (!inputs[index]) {
                inputRefs.current[index - 1].focus();
              }
              if (inputs[index]) {
                setInputs((prev) => {
                  const newInputs = [...prev];
                  newInputs[index] = null;
                  return newInputs;
                });
              }
            }
          }}
        />
      ))}
      {otpError && <p className="text-red-500">{otpError}</p>}
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
