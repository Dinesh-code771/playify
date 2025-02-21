"use client";
import React, { useState } from "react";
import Accordion from "../components/Accordion";

function Question({ values }) {
  return (
    <div className="flex gap-2 justify-between w-[90%]">
      {values.map((value, index ) => {
        return (
          <h1 key={index} className="text-gray-800">
            {value}
          </h1>
        );
      })}
    </div>
  );
}
export default function page() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      Question: <Question values={["What is the capital of France?"]} />,
      answer: "Paris sdkjfbdksf  slfdjdskfjb dsfkdsbf ddskfbdsl dsdsb",
      isImage: false,
    },
    {
      id: 2,
      Question: (
        <Question
          values={[
            "What is the capital of France?",
            "What is the capital of France?",
          ]}
        />

      ),
      answer:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      isImage: false,
    },
    {
      id: 3,
      Question: <Question values={["What is the capital of France?"]} />,
      answer: "https://picsum.photos/200/300",
      isImage: true,
    },
  ]);
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState([]);
  return (
    <div className="wrapper flex-[8] light:bg-[white] dark:bg-black flex items-center justify-center h-full">
      <div
        className={`flex ${
          currentSelectedIndex.length > 0 ? "gap-3" : ""
        } flex-col border-2 w-[50%] border-gray-300 rounded-lg p-4`}
      >
        {questions.map((question, index) => {
          return (
            <Accordion
              key={question.id}
              question={question}
              Question={question.Question}
              currentSelectedIndex={currentSelectedIndex}
              setCurrentSelectedIndex={setCurrentSelectedIndex}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}
