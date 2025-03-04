"use client";
import React, {
  useState,
  memo,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import Accordion from "../components/Accordion";

function Question({ values }) {
  return (
    <div className="flex gap-2 justify-between w-[90%]">
      {values.map((value, index) => {
        return (
          <h1 key={index} className="text-gray-800">
            {value}
          </h1>
        );
      })}
    </div>
  );
}
// export default function page() {
//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       Question: <Question values={["What is the capital of France?"]} />,
//       answer: "Paris sdkjfbdksf  slfdjdskfjb dsfkdsbf ddskfbdsl dsdsb",
//       isImage: false,
//     },
//     {
//       id: 2,
//       Question: (
//         <Question
//           values={[
//             "What is the capital of France?",
//             "What is the capital of France?",
//           ]}
//         />

//       ),
//       answer:
//         "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
//       isImage: false,
//     },
//     {
//       id: 3,
//       Question: <Question values={["What is the capital of France?"]} />,
//       answer: "https://picsum.photos/200/300",
//       isImage: true,
//     },
//   ]);
//   const [currentSelectedIndex, setCurrentSelectedIndex] = useState([]);
//   return (
//     <div className="wrapper flex-[8] light:bg-[white] dark:bg-black flex items-center justify-center h-full">
//       <div
//         className={`flex ${
//           currentSelectedIndex.length > 0 ? "gap-3" : ""
//         } flex-col border-2 w-[50%] border-gray-300 rounded-lg p-4`}
//       >
//         {questions.map((question, index) => {
//           return (
//             <Accordion
//               key={question.id}
//               question={question}
//               Question={question.Question}
//               currentSelectedIndex={currentSelectedIndex}
//               setCurrentSelectedIndex={setCurrentSelectedIndex}
//               index={index}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }
const Child2 = memo(() => {
  console.log("rendered child2");
  return (
    <>
      <h2>child2</h2>
    </>
  );
});

const Child = memo(({ count }) => {
  console.log("rendered child1");
  return (
    <>
      <h2>child1</h2>
      {count}
    </>
  );
});

const List = memo(({ items, updateITems }) => {
  console.log("called");
  return (
    <>
      {items.map((item) => {
        return <h2 key={item}>{item}</h2>;
      })}
      <button
        onClick={() => {
          updateITems("dinesh2");
        }}
      >
        update
      </button>
    </>
  );
});

export default function Page() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(["dinesh", "sruthi", "sirisha"]);

  function updateITems(value) {
    //767654754
    setItems((prev) => {
      return [...prev, value];
    });
  }

  const memoFunction = useCallback(updateITems, []);

  // const updateITems = useCallback((value) => {
  //   setItems((prev) => {
  //     return [...prev, value];
  //   });
  // }, []);
  return (
    // <div className="containet">
    //   {count}
    //   <button
    //     onClick={() => {
    //       setCount((prev) => {
    //         return prev + 1;
    //       });
    //     }}
    //   >
    //     increment
    //   </button>
    //   <List items={items} updateITems={memoFunction} />
    // </div>
    <>
      <ProgessBar value={40} />
    </>
  );
}

function ProgessBar({ value }) {
  const [animatedValue, setAnimatedVale] = useState(0);
  useEffect(() => {
    setAnimatedVale(value);
  }, [value]);
  return (
    <div className="container w-full">
      <div className="bar flex border overflow-hidden border-white w-[500px] h-[20px]">
        <div
          style={{
            transform: `translateX(${animatedValue - 100}%)`,
            transition: "0.5s ease-in",
          }}
          className={` w-full bg-green-300 h-full text-black text-right`}
        >
          {value}%
        </div>
      </div>
    </div>
  );
}
