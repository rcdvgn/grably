import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./_contexts/AuthContext";

export const metadata: Metadata = {
  title: "Grably",
  description: "Catalogo interativo de filmes e séries.",
};


import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_contexts/AuthContext";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}