"use client";

import Home from "@/components/layout/home/Home";
import React from "react";

function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <Home>{props.children}</Home>
    </>
  );
}

export default Layout;
