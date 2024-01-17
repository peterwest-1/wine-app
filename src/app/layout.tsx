import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Wine App",
  description: "Wine App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={`font-sans ${inter.variable}`}> */}
      <body>
        <TRPCReactProvider>
          {children} <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
