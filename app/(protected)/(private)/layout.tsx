"use client";

import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/app/_contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { ActionsProvider } from "@/app/_contexts/ActionsContext";

const AuthenticatedLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();

  const fileId = params?.fileId || null;

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      {user ? (
        <div id="main" className="flex">
          <ActionsProvider> {children}</ActionsProvider>
             
        </div>
      ) : null}
    </>
  );
};

export default AuthenticatedLayout;

