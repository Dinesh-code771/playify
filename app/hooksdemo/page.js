"use client";
import useLocaStorageState from "@/hooks/useLocaStorageState";
import React, { useEffect } from "react";
import { useState } from "react";
export default function page() {
  const [details, setDetails] = useLocaStorageState("details", {
    name: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(details);
    localStorage.removeItem("details");
    setDetails({ name: "", email: "", password: "" });
  }
  return (
    <div className="flex w-full h-full items-center justify-center">
      <form className="flex flex-col gap-4 w-[50%]">
        <input
          type="text"
          name={"name"}
          placeholder="Enter your name"
          className="border-2 border-gray-300 p-2 rounded-lg text-black"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="border-2 border-gray-300 p-2 rounded-lg text-black"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="border-2 border-gray-300 p-2 rounded-lg text-black"
          value={details.password}
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
