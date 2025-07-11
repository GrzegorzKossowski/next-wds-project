"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return <button onClick={() => router.back()}>Zamknij</button>;
}
