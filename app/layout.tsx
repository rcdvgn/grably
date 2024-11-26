import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./_contexts/AuthContext";
import { ModalProvider } from "./_contexts/ModalContext";
import ModalContainer from "./_components/ModalContainer";
import { ActionsProvider } from "@/app/_contexts/ActionsContext";

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
        <AuthProvider>
          <ActionsProvider>
            <ModalProvider>
              <div id="main" className="flex">
                <div style={{ position: "relative" }}></div>
                {children}
                <ModalContainer />
              </div>
            </ModalProvider>
          </ActionsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
