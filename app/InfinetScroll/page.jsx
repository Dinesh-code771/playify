"use client";
import { useInfinite } from "../../hooks/useInfinite";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

const fetchItems = async (page) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  );
  return res.json();
};
export default function page() {
  const observerRef = useRef(null);
  const { items, loading } = useInfinite(observerRef, fetchItems);
  return (
    <div className="h-[200px] border overflow-auto">
      <h2>infinite scroll</h2>
      <ul className="flex flex-col">
        {items.map((item, index) => {
          return <li key={item.id}>{item.title}</li>;
        })}

        {loading && <p>Loading....</p>}
        <div
          ref={observerRef}
          style={{ height: "20px", background: "transparent" }}
        ></div>
      </ul>
    </div>
  );
}
