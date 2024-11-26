"use client";

import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/app/_contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";

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

  return <>{user ? <> {children}</> : null}</>;
};

export default AuthenticatedLayout;
