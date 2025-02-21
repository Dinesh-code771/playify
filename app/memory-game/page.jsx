import React from "react";
import MemoryBoard from "../components/MemoryBoard";

export default function page() {
  return (
    <div className="wrapper flex-[8]  light:bg-[white] dark:bg-black flex items-center justify-center h-full">
      <MemoryBoard />
    </div>
  );
}
