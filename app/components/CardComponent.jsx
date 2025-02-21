import React from "react";

export default function CardComponent({
  item,
  showValue,
  onClick,
  isFilped,
  isSolved,
  size,
}) {
  return (
    <div
      onClick={() => {
        onClick(item.id, item.value);
      }}
      className={`border-2 dark:border-black border-white ${
        isFilped
          ? "dark:bg-[white] dark:text-black bg-[black] text-white"
          : isSolved
          ? "bg-green-500 text-black"
          : "dark:bg-slate-400 bg-[Grey]"
      } rounded-md shadow-md cursor-pointer ${
        size > 4 ? "w-[5rem] h-[5rem]" : "w-[10rem] h-[10rem]"
      }   flex items-center justify-center`}
    >
      <p className="text-[2rem] font-bold font-mono">
        {showValue && item.value}
      </p>
    </div>
  );
}
