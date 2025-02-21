import React from "react";

export default function Accordion({
  question,
  currentSelectedIndex,
  setCurrentSelectedIndex,
  index,
  Question,
}) {
  return (
    <div
      onClick={() => {
        if (currentSelectedIndex.includes(question.id)) {
          let newCurrentSelectedIndex = currentSelectedIndex.filter(
            (item) => item !== question.id
          );
          setCurrentSelectedIndex(newCurrentSelectedIndex);
        } else {
          setCurrentSelectedIndex([...currentSelectedIndex, question.id]);
        }
      }}
      className="w-full bg-gray-100 cursor-pointer border-b border-gray-300 p-4 text-gray-800"
    >
      <div className="flex items-center justify-between">
        {Question}
        <button>{currentSelectedIndex === question.id ? "-" : "+"}</button>
      </div>
      {question.answer && currentSelectedIndex.includes(question.id) && (
        <div className={`overflow-hidden transition duration-500 ease-in-out `}>
          {question.isImage ? (
            <img src={question.answer} alt="answer" className="w-50 h-50" />
          ) : (
            <p>{question.answer}</p>
          )}
        </div>
      )}
    </div>
  );
}
