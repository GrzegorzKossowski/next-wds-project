"use client";
import { getSession } from "next-auth/react";
import { toast } from "sonner";

export function RefreshSessionButton() {
  const refresh = async () => {
    const session = await getSession();
    if (session) {
      toast.success("Sesja odświeżona!");
    } else {
      toast.error("Sesja wygasła.");
    }
  };

  return (
    <button onClick={refresh} className="text-blue-500 underline">
      Odśwież sesję
    </button>
  );
}

