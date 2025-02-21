"use client";
import React, { useState, Suspense } from "react";

const Tab1 = React.lazy(() => import("./Tab1")); // Dynamically import
const Tab2 = React.lazy(() => import("./Tab2"));
const Tab3 = React.lazy(() => import("./Tab3"));

const tabComponents = [
  { title: "Tab 1", Component: Tab1 },
  { title: "Tab 2", Component: Tab2 },
  { title: "Tab 3", Component: Tab3 },
];

export default function TabComponent() {
  const [currentTab, setCurrentTab] = useState(0);

  const CurrentComponent = tabComponents[currentTab].Component;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {tabComponents.map(({ title }, index) => (
          <button
            key={index}
            onClick={() => setCurrentTab(index)}
            className={`tab-button px-4 py-2 rounded ${
              currentTab === index ? "bg-slate-200" : "bg-white"
            } border-2 border-slate-200 text-black`}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <Suspense fallback={<div>Loading...</div>}>
          <CurrentComponent />
        </Suspense>
      </div>
    </div>
  );
}
