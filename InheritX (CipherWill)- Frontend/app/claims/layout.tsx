"use client";
// import  from "@components/Portfolio/Portfolio/PortfolioNav";
import dynamic from "next/dynamic";
import React from "react";

const ClaimNav = dynamic(() => import("@/components/myClaims/ClaimNav"), {
  // Do not import in server side
  ssr: false,
});
function ClaimRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClaimNav>{children}</ClaimNav>
    </>
  );
}

export default ClaimRootLayout;
