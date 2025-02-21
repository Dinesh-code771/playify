"use client";
import React, { useEffect } from "react";
import CardComponent from "./CardComponent";
import { useState } from "react";
export default function MemoryBoard() {
  const [size, setSize] = useState(4);
  const [board, setBoard] = React.useState(
    Array(size * size)
      .fill(null)
      .map((value, index) => {
        return {
          id: null,
          value: value,
        };
      })
  );
  const [filped, setFilped] = useState([]);
  const [solved, setSolved] = useState([]);
  //make number pairs for the board
  useEffect(() => {
    setFilped([]);
    setSolved([]);
    const numbers = Array((size * size) / 2)
      .fill(0)
      .map((_, index) => index + 1)
      .sort(() => Math.random() - 0.5);
    const newBoard = numbers.concat(numbers).sort(() => Math.random() - 0.5);
    const boradValues = newBoard.map((val, index) => {
      return {
        id: index * 2,
        value: val,
      };
    });
    console.log(boradValues);
    setBoard(boradValues);
  }, [size]);

  //handle card click
  function handleCardClick(id, value) {
    let values = [...filped];
    if (filped.length === 0) {
      values = [...filped];
      values[0] = {
        id,
        value,
      };
      console.log(values);
      setFilped(values);
    } else {
      // check if number match in the array
      values[1] = {
        id,
        value,
      };
      setFilped(values);

      setTimeout(() => {
        if (values[0].value === values[1].value) {
          setSolved([...solved, ...values]);
        }
        setFilped([]);
      }, 500);
    }
  }

  return (
    <div className="wrapper flex flex-col items-center gap-5">
        {/* header */}
      <div className="headerWrapper flex justify-between w-full p-2">
        <h3 className="dark:text-white text-black text-[1.5rem] font-mono">
          Memory Game
        </h3>
        {/* sizee drop down */}
        <select
          value={size}
          onChange={(e) => {
            setSize(parseInt(e.target.value));
          }}
          className="dark:bg-[black] dark:text-white bg-blue-200 w-[50%] border text-black p-2  rounded-md"
        >
          <option value={4}>4x4</option>
          <option value={2}>2x2</option>
          <option value={6}>6x6</option>
        </select>

      </div>
      <div className={` grid grid-cols-${size} gap-2`}>
        {board.map((item, index) => (
          <CardComponent
            key={index}
            item={item}
            showValue={
              filped.map((fil) => fil.id).includes(item.id) ||
              solved.map((fil) => fil.id).includes(item.id)
            }
            size={size}
            isFilped={filped.map((fil) => fil.id).includes(item.id)}
            isSolved={solved.map((fil) => fil.id).includes(item.id)}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}
