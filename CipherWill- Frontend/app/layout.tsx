"use client";

import "./globals.css";

const Layout = dynamic(() => import("@/components/layout/Layout"), {
  // Do not import in server side
  ssr: false,
});
import Providers from "@/components/providers/Providers";
import dynamic from "next/dynamic";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        {
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        }
      </body>
    </html>
  );
}
