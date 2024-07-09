"use client";
import React, { useState } from "react";
import { NavigationBar } from "./navigation-bar";

export const BaseLayout = ({ children }: any) => {
  const [toggled, setToggle] = useState(true);
  return (
    <div className="">
      {/* <div className="w-full h-12 bg-yellow-500">Header</div> */}
      <div className="flex flex-1 border-r">
        <NavigationBar toggled={toggled} setToggle={setToggle} />
        <div className="max-h-screen h-screen overflow-y-auto w-full p-4">{children}</div>
      </div>
    </div>
  );
};
