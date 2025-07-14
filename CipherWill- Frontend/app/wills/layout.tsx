"use client";
// import  from "@components/Portfolio/Portfolio/PortfolioNav";
import dynamic from "next/dynamic";
import React from "react";

const WillNav = dynamic(() => import("@/components/myWills/WillNav"), {
  // Do not import in server side
  ssr: false,
});
export default function WillRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WillNav>{children}</WillNav>
    </>
  );
}
