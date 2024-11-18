"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {useAuth} from "@/app/_contexts/AuthContext"

export default function SignoutPage() {

    const {logout } = useAuth()
  const router = useRouter();

  useEffect(() => {
    logout()

  }, [router]);

  return (
    <div>
      <h1>Saindo...</h1>
      <p>Aguarde enquanto estamos realizando o logout.</p>
    </div>
  );
}
