"use client";
import useLocaStorageState from "@/hooks/useLocaStorageState";
import React, { useState, useEffect } from "react";

export default function XOXO() {
  const [board, setBoard] = useLocaStorageState("game", Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isWinner, setIsWinner] = useState(false);
  const winnningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  function isAnyWinner(newBoard) {
    for (let pattern of winnningCombinations) {
      let [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (isAnyWinner(board)) {
      setIsWinner(true);
    }
  }, []);
  function handleCellClick(index) {
    if (isWinner) return;
    const newBoard = [...board]; //[null,null,null,null,null,null,null,null,null]
    newBoard[index] = currentPlayer; //[x,null,x,x,x,x,null,null,x]
    setBoard(newBoard); //takes time to update
    if (isAnyWinner(newBoard)) {
      setIsWinner(true);
      return;
    }
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }
  return (
    <div className="flex w-full flex-col items-center justify-center h-screen">
      {isWinner && (
        <div className="text-2xl font-bold">{currentPlayer} is the winner</div>
      )}
      <div className="board grid grid-cols-3  rounded-md p-4">
        {board.map((value, index) => (
          <div
            key={index}
            onClick={() => handleCellClick(index)}
            className="cell border border-gray-300 rounded-md w-20 h-20 text-center flex items-center justify-center"
          >
            {value}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setBoard(Array(9).fill(null));
          setIsWinner(false);
        }}
      >
        Reset
      </button>
    </div>
  );
}
