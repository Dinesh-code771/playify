"use client";
import React, { useState, useRef, useEffect, useMemo, useReducer } from "react";
const intialState = {
  details: {
    name: "",
    email: "",
    phone: "",
  },
  detailsError: {
    nameError: "",
    emailError: "",
    phoneError: "",
  },
  otp: [],
  otpError: "",
  currentStep: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DETAILS":
      return {
        ...state,
        details: action.payload,
      };

    case "SET_DETAILS_ERROR":
      return {
        ...state,
        detailsError: action.payload,
      };
    case "SET_OTP":
      return {
        ...state,
        otp: action.payload,
      };
    case "SET_OTP_ERROR":
      return {
        ...state,
        otpError: action.payload,
      };
    case "SET_CURRENT_STEP":
      return {
        ...state,
        currentStep: action.payload,
      };
    default:
      return state;
  }
}
export default function MultiStepForm() {
  const [state, dispatch] = useReducer(reducer, intialState);

  function handleSubmit(inputs, e = null) {
    if (!isValidate()) {
      return;
    }
    if (e) {
      e.currentTarget.blur();
      // setCurrentStep(currentStep + 1);
    }

    dispatch({
      type: "SET_CURRENT_STEP",
      payload: state.currentStep + 1,
    });
  }

  function isValidate() {
    if (state.currentStep === 1) {
      console.log(state.otp);
      if (state.otp.join("").length === 4) {
        dispatch({
          type: "SET_OTP_ERROR",
          payload: "",
        });
        return true;
      } else {
        console.log(state.otp);
        dispatch({
          type: "SET_OTP_ERROR",
          payload: "please write the otp",
        });
        return false;
      }
    }
    if (
      state.details.name.length &&
      state.details.email.length &&
      state.details.phone.length
    ) {
      // setIsValidate(true);
      // setDetailsError({
      //   nameError: "",
      //   emailError: "",
      //   phoneError: "",
      // });
      dispatch({
        type: "SET_DETAILS_ERROR",
        payload: {
          nameError: "",
          emailError: "",
          phoneError: "",
        },
      });
    } else if (!state.details.name.length) {
      // setIsValidate(false);
      console.log("name error");
      dispatch({
        type: "SET_DETAILS_ERROR",
        payload: {
          nameError: "please write the name",
        },
      });
    } else if (!state.details.email.length) {
      // setIsValidate(false);
      dispatch({
        type: "SET_DETAILS_ERROR",
        payload: {
          emailError: "please write the email",
        },
      });
    } else if (!state.details.phone.length) {
      // setIsValidate(false);
      dispatch({
        type: "SET_DETAILS_ERROR",
        payload: {
          phoneError: "please write the phone",
        },
      });
    }
    if (
      state.details.name.length &&
      state.details.email.length &&
      state.details.phone.length
    ) {
      return true;
    }
    return false;
  }

  function next() {
    if (!isValidate()) {
      return;
    }
    dispatch({
      type: "SET_CURRENT_STEP",
      payload: state.currentStep + 1,
    });
  }
  let steps = useMemo(
    () => [
      {
        id: 1,
        component: (
          <Form
            details={state.details}
            setDetails={(payload) => {
              dispatch({ type: "SET_DETAILS", payload });
            }}
            detailsError={state.detailsError}
          />
        ),
      },
      {
        id: 2,
        component: (
          <OTPForm
            inputNumber={4}
            handleSubmit={handleSubmit}
            setOtp={(payload) => {
              dispatch({ type: "SET_OTP", payload });
            }}
            otpError={state.otpError}
          />
        ),
      },
      {
        id: 3,
        component: <DetailsDisplay details={state.details} />,
      },
    ],
    [state.details, state.otpError, state.detailsError, state.otp]
  );
  return (
    <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
      {steps[state.currentStep].component}
      <div className="flex gap-4">
        <button
          disabled={state.currentStep === 0}
          onClick={() => {
            if (state.currentStep === 2) {
              dispatch({
                type: "SET_CURRENT_STEP",
                payload: state.currentStep - 2,
              });
            } else {
              dispatch({
                type: "SET_CURRENT_STEP",
                payload: state.currentStep - 1,
              });
            }
          }}
        >
          Previous
        </button>
        <button
          disabled={state.currentStep === steps.length - 1}
          onClick={next}
          className={`bg-blue-500 text-white p-2 rounded-md ${
            state.currentStep === steps.length - 1 ? "opacity-50" : ""
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
