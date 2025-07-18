"use client";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function RefreshSessionButton() {
  const router = useRouter();
  const refresh = async () => {
    const session = await getSession();
    if (session) {
      toast.success("Sesja odświeżona!");
    } else {
      toast.error("Sesja wygasła. Nastąpi przekierowanie...");
      setTimeout(() => {
        router.push("/");
      }, 6000);
    }
  };

  return (
    <button onClick={refresh} className="text-blue-500 underline">
      Odśwież sesję
    </button>
  );
}
